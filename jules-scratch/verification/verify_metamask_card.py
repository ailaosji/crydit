from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    page.goto("http://localhost:4321/cards/metamask-card")

    # --- Assertions to verify content ---

    # Check for the main heading
    heading = page.get_by_role("heading", name="MetaMask Card 等级与费用对比")
    expect(heading).to_be_visible(timeout=15000)

    # Check for tier name in table header
    tier_header = page.get_by_role("cell", name="Free (Virtual)")
    expect(tier_header).to_be_visible()

    # Check for a few fee labels and values
    expect(page.get_by_role("cell", name="Token Conversion")).to_be_visible()
    expect(page.get_by_role("cell", name="0.875% (for non-stablecoins)").first).to_be_visible()

    # --- Screenshotting ---

    # Scroll to the table
    heading.scroll_into_view_if_needed()

    # Find the container to screenshot
    fee_section_container = heading.locator("xpath=..")

    # Screenshot the container
    fee_section_container.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
