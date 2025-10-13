import asyncio
from playwright.async_api import async_playwright

async def run_debug():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()

        # Go to the homepage
        await page.goto("http://localhost:4321")

        # Wait for a while to allow for manual inspection
        await asyncio.sleep(60)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_debug())