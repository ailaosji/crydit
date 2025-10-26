
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:4321/articles/remitly-us-to-china")

        # Take a screenshot of the article page
        page.screenshot(path="jules-scratch/verification/article_verification.png")

        browser.close()

if __name__ == "__main__":
    run()
