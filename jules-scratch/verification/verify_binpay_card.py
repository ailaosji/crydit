from playwright.sync_api import Page, expect

def test_binpay_card_details_page(page: Page):
    """
    This test verifies that the BinPay card tier comparison is displayed correctly
    on the card details page.
    """
    # 1. Arrange: Go to the BinPay card details page.
    page.goto("http://localhost:4321/cards/binpay-card")

    # 2. Act: Locate the tier comparison section.
    # The TierComparison component is rendered inside a section. We'll target that.
    tier_comparison_section = page.locator("section:has(h2:has-text('等级对比'))")

    # 3. Assert: Ensure the section is visible.
    expect(tier_comparison_section).to_be_visible()

    # Take a screenshot for visual verification.
    tier_comparison_section.screenshot(path="jules-scratch/verification/binpay-card-details.png")