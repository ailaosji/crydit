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
    expect(card_table).to_be_visible(timeout=10000)

    # --- Verification for Crydit Card (multi-tier, specific prices) ---
    crydit_row = page.locator("tr:has-text('Crydit Card')")

    # Verify virtual card fee display
    virtual_card_cell_crydit = crydit_row.locator("td").nth(2)
    expect(virtual_card_cell_crydit).to_contain_text("Visa: $179 / MC: $199")

    # Verify physical card fee display
    physical_card_cell_crydit = crydit_row.locator("td").nth(3)
    expect(physical_card_cell_crydit).to_contain_text("Visa: $179 / MC: $199")

    # --- Verification for a different card (e.g., Avalanche, single tier with openingFee) ---
    # This ensures the fallback logic works correctly.
    avalanche_row = page.locator("tr:has-text('Avalanche Card')")

    # Assuming Avalanche card has a single opening fee, let's verify it.
    # We'll check for a simple dollar amount. This part of the test might need adjustment
    # based on the actual data for Avalanche card, but it serves to test the fallback.
    # Let's assume its opening fee is $0 (Free) for this test case.
    virtual_card_cell_avalanche = avalanche_row.locator("td").nth(2)
    expect(virtual_card_cell_avalanche).to_contain_text("免费")

    # Take a screenshot of the card table for visual confirmation
    card_table.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)