from aiohttp import web
from uuid import uuid4

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
    pass

@route('GET', '/event')
async def list_events(request):
    pass

# Bidding

@route('POST', '/bid')
async def create_bid(request):
    # Returns matched event ID
    pass

@route('GET', '/bid')
async def list_bids(request):
    pass

@route('DELETE', '/bid')
async def delete_bid(request):
    pass

app = web.Application()

if __name__ == '__main__':
    web.run_app(app)

