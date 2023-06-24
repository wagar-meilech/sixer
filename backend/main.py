from aiohttp import web
from uuid import uuid4

from json_dict_store import JSONDictStore
from event_search import get_best_event, survey_defaults

bid_store = JSONDictStore('/app/bids.json')
event_store = JSONDictStore('/app/events.json')

app = web.Application()

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

    return web.json_response({ "event_id": best_event_id, "event": best_event })

@route('GET', '/event/{id}')
async def get_event_info(request):
    event_id = request.match_info.get('id')
    event = await bid_store.get(event_id)
    return web.json_response(event)

@route('GET', '/event')
async def list_events(request):
    return web.json_response(await event_store.get_all())

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

