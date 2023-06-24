import asyncio

from aiohttp import web
from uuid import uuid4
from eventgenerator import fill_sponsor, generate_random_event

from json_dict_store import JSONDictStore
from event_search import get_best_event, survey_defaults

bid_store = JSONDictStore('/app/bids.json')
event_store = JSONDictStore('/app/events.json')
filled_event_store = JSONDictStore('/app/sponsored_events.json')

app = web.Application()

async def create_event(event_id):
    event = await generate_random_event()
    await event_store.set(event_id, event)

async def get_best_bid(bid_store):
    bids = await bid_store.get_all()

    best_price = 0
    best_bid = None
    best_bid_id = None

    for bid_id, bid in bids.items():
        if bids['partner']:
            continue

        price = float(bids['price'])

        if price > best_price:
            best_price = price
            best_bid = bid
            best_bid_id = bid_id

    return best_bid_id, best_bid


def route(method, path):
    def decorator(handler):
        app.router.add_route(method, path, handler)
        return handler
    return decorator

@route('GET', '/health')
async def health_check(request):
    return web.json_response({"status": "ok"})

# Survey / Event matching

@route('POST', '/survey')
async def submit_survey(request):
    data = await request.json()

    survey_keys = survey_defaults().keys()

    survey = {}

    for key in survey_keys:
        survey[key] = data.get(key)

    await event_store.load_data()
    events = event_store.data

    best_event_id, best_event = get_best_event(survey, events)

    return web.json_response({ "event_id": best_event_id, "raw_event": best_event })

@route('POST', '/event/{id}/unwrap')
async def unwrap_event(request):
    event_id = request.match_info.get('id')

    event = await event_store.get(event_id)
    best_bid_id, best_bid = await get_best_bid(bid_store)

    if event and best_bid:
        event_copy = event.copy()
        print("Found best bid and event template. Bid ID:", best_bid_id)
        new_event = await fill_sponsor(best_bid['location'], best_bid['activity'], event_copy)
        await filled_event_store.set(event_id, new_event)

        best_bid['completed'] = True

        await bid_store.set(best_bid_id, best_bid)

    return web.json_response({ 'event_id': event_id, 'bid_id': best_bid_id }, status = 202)

@route('GET', '/event/{id}')
async def get_event_info(request):
    event_id = request.match_info.get('id')

    filled = await filled_event_store.get(event_id)

    if filled:
        return web.json_response({ 'event_id': event_id, 'event': filled, 'filled': True })

    unfilled = await event_store.get(event_id)

    if unfilled:
        return web.json_response({ 'event_id': event_id, 'event': unfilled, 'filled': False })

    return web.json_response({ 'error': 'Not found' }, status = 404)

@route('GET', '/event')
async def list_events(request):
    return web.json_response(await event_store.get_all())

@route('POST', '/event')
async def generate_event(request):
    event_id = str(uuid4())

    print("Generating event for ID", event_id)

    asyncio.create_task(create_event(event_id))

    return web.json_response({ 'event_id': event_id }, status = 202)



# Bidding

@route('POST', '/bid')
async def create_bid(request):
    data = await request.json()

    location = data.get('location')
    activity = data.get('activity')
    price = data.get('price')
    partner = data.get('partner')

    # Returns matched event ID
    bid_id = str(uuid4())

    await bid_store.set(bid_id, {
        'location': location,
        'activity': activity,
        'price': price,
        'partner': partner,
        'completed': False,
    })

    return web.json_response({"bid_id": bid_id})

@route('GET', '/bid')
async def list_bids(request):
    return web.json_response(await bid_store.get_all())

@route('DELETE', '/bid/{id}')
async def delete_bid(request):
    bid_id = request.match_info.get('id')
    await bid_store.delete(bid_id)
    return web.json_response({"bid_id": bid_id})


if __name__ == '__main__':
    web.run_app(app)

