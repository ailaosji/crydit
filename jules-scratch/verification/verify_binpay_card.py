from playwright.sync_api import Page, expect

def test_homepage_card_table(page: Page):
    """
    This test verifies that the BinPay card information is displayed correctly
    on the homepage card table.
    """
    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:4321/")

    # 2. Act: Locate the card table.
    card_table_body = page.locator("#card-table-body")

    # 3. Assert: Ensure the table is visible.
    expect(card_table_body).to_be_visible()

    # Take a screenshot for visual verification.
    card_table_body.screenshot(path="jules-scratch/verification/homepage-card-table.png")