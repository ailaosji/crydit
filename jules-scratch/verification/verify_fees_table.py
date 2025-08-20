from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    page.goto("http://localhost:4321/cards/onekey-card")

    # --- Assertions to verify content ---

    # Check for the main heading
    heading = page.get_by_role("heading", name="OneKey Card 等级与费用对比")
    expect(heading).to_be_visible(timeout=15000)

    # Check for tier name in table header
    tier_header = page.get_by_role("cell", name="Standard (虚拟卡)")
    expect(tier_header).to_be_visible()

    # Check for a few fee labels and values
    expect(page.get_by_role("cell", name="充值手续费")).to_be_visible()
    expect(page.get_by_role("cell", name="1%").first).to_be_visible() # Use .first in case '1%' appears elsewhere

    expect(page.get_by_role("cell", name="交易手续费")).to_be_visible()
    expect(page.get_by_role("cell", name="1.5%").first).to_be_visible()

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
