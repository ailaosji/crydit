from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    page.goto("http://localhost:4321/cards/nexo-card")

    # Check for the main heading of the fee table
    heading = page.get_by_role("heading", name="Nexo Card 等级与费用对比")
    expect(heading).to_be_visible(timeout=15000)

    # Scroll to the table
    heading.scroll_into_view_if_needed()

    # Find the container to screenshot
    fee_section_container = heading.locator("xpath=..")

    # Screenshot the container
    fee_section_container.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
