import asyncio
import aiohttp
from bs4 import BeautifulSoup


async def process_link(url: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            html_text = await response.text()
            soup = BeautifulSoup(html_text, "html.parser")
            return soup.get_text()


if __name__ == "__main__":
    asyncio.run(
        process_link(
            "https://www.twilio.com/en-us/blog/web-scraping-and-parsing-html-in-python-with-beautiful-soup"
        )
    )
