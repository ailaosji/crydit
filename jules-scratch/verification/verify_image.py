import sys
from playwright.sync_api import sync_playwright, expect

def run_verification(image_url, output_path):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the homepage
        page.goto(f"http://localhost:4321?image_url={image_url}")

        # Find the featured cards section using a more specific locator
        featured_cards_section = page.locator("section:has(h2:has-text('年度最佳U卡'))")

        # Scroll to the section
        featured_cards_section.scroll_into_view_if_needed()

        # Wait for the section to be visible
        expect(featured_cards_section).to_be_visible()

        # Wait for a bit to ensure everything has rendered
        page.wait_for_timeout(3000)

        # Take a screenshot of the section
        featured_cards_section.screenshot(path=output_path)

        browser.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python verify_image.py <image_url> <output_path>")
        sys.exit(1)

    image_url = sys.argv[1]
    output_path = sys.argv[2]
    run_verification(image_url, output_path)