from aiohttp import web

def route(method, path):
    def decorator(handler):
        app.router.add_route(method, path, handler)
        return handler
    return decorator

@route('GET', '/health')
async def health_check(request):
    return web.json_response({"status": "ok"})

app = web.Application()

if __name__ == '__main__':
    web.run_app(app)

