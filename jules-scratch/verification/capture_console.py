import sys
from playwright.sync_api import sync_playwright, expect

def run_verification(image_url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for all console events and print them
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))

        # Go to the homepage with the specified image_url
        # The URL must be properly encoded
        from urllib.parse import quote
        encoded_url = quote(image_url)
        page.goto(f"http://localhost:4321?image_url={encoded_url}")

        # Find the featured cards section
        featured_cards_section = page.locator("section:has(h2:has-text('年度最佳U卡'))")

        # Scroll to the section
        featured_cards_section.scroll_into_view_if_needed()

        # Wait for the section to be visible
        expect(featured_cards_section).to_be_visible()

        # Wait for a bit to ensure all events have been captured
        page.wait_for_timeout(5000)

        browser.close()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python capture_console.py <image_url>")
        sys.exit(1)

    image_url = sys.argv[1]
    run_verification(image_url)