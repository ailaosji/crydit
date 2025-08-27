import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Navigate to the local development server URL
        await page.goto("http://localhost:4321")

        # Wait for the main content to be visible to ensure the page has loaded
        await expect(page.locator("main")).to_be_visible(timeout=10000)

        # Take a screenshot
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
