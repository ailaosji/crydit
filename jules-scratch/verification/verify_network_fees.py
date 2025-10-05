from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Navigate to the local development server
    page.goto("http://localhost:4321")

    # Find the "Recommended U-Cards" section header and scroll to it
    recommended_section_header = page.get_by_role("heading", name="推荐U卡")
    recommended_section_header.scroll_into_view_if_needed()

    # Wait for the card table to be visible
    card_table = page.locator("table")
    expect(card_table).to_be_visible(timeout=10000) # Increased timeout

    # Locate the row for "Crydit Card"
    crydit_row = page.locator("tr:has-text('Crydit Card')")

    # Verify the virtual card opening fee displays the correct network-specific fees
    virtual_card_cell = crydit_row.locator("td").nth(2)
    expect(virtual_card_cell).to_contain_text("Visa: $179 / MC: $199")

    # Verify the physical card opening fee displays the correct network-specific fees
    physical_card_cell = crydit_row.locator("td").nth(3)
    expect(physical_card_cell).to_contain_text("Visa: $179 / MC: $199")

    # Take a screenshot of the card table for visual confirmation
    card_table.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)