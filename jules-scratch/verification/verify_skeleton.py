from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the homepage
        page.goto("http://localhost:4321")

        # Find the featured cards section using a more specific locator
        featured_cards_section = page.locator("section:has(h2:has-text('年度最佳U卡'))")

        # Scroll to the section
        featured_cards_section.scroll_into_view_if_needed()

        # Wait for the section to be visible
        expect(featured_cards_section).to_be_visible()

        # Add a small delay to ensure rendering is complete
        page.wait_for_timeout(1000)

        # Take a screenshot of the section
        featured_cards_section.screenshot(path="jules-scratch/verification/skeleton.png")

        browser.close()

if __name__ == "__main__":
    run_verification()