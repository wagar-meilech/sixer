import json
import aiofiles

class JSONDictStore:
    def __init__(self, file_path):
        self.file_path = file_path
        self.data = {}

    async def load_data(self):
        try:
            async with aiofiles.open(self.file_path, mode='r') as file:
                content = await file.read()
                self.data = json.loads(content)
        except Exception as e:
            print("Failed to load data: ", e)
            self.data = {}

    async def commit(self):
        async with aiofiles.open(self.file_path, mode='w') as file:
            content = json.dumps(self.data)
            await file.write(content)

    async def get(self, key, default=None):
        await self.load_data()
        return self.data.get(key, default)

    async def set(self, key, value):
        await self.load_data()
        self.data[key] = value
        await self.commit()

    async def delete(self, key):
        await self.load_data()
        if key in self.data:
            del self.data[key]
            await self.commit()
            return True
        else:
            return False

