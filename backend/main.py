from aiohttp import web
from uuid import uuid4

from json_dict_store import JSONDictStore

bid_store = JSONDictStore('/tmp/bids.json')
event_store = JSONDictStore('/tmp/events.json')

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
    # Returns matched event ID
    return uuid4()

@route('GET', '/event/{id}')
async def get_event_info(request):
    event_id = request.match_info.get('id')
    event = await bid_store.get(event_id)
    return web.json_response(event)

@route('GET', '/event')
async def list_events(request):
    await event_store.load_data()
    return web.json_response(event_store.data)

# Bidding

@route('POST', '/bid')
async def create_bid(request):
    data = await request.json()

    location = data.get('location')
    activity = data.get('activity')
    price = data.get('price')

    # Returns matched event ID
    bid_id = str(uuid4())

    await bid_store.set(bid_id, {
        location,
        activity,
        price
    })

    return web.json_response({"bid_id": bid_id})

@route('GET', '/bid')
async def list_bids(request):
    await bid_store.load_data()
    return web.json_response(bid_store.data)

@route('DELETE', '/bid/{id}')
async def delete_bid(request):
    bid_id = request.match_info.get('id')
    await bid_store.delete(bid_id)
    return web.json_response({"bid_id": bid_id})


if __name__ == '__main__':
    web.run_app(app)

