from playwright.sync_api import Page, expect

def test_binpay_card_update(page: Page):
    """
    This test verifies that the BinPay card page correctly reflects
    that physical cards are not available.
    """
    # 1. Arrange: Go to the BinPay card page.
    page.goto("http://localhost:4321/cards/binpay-card")

    # Scroll down to the tier comparison section.
    element = page.locator("text=等级对比")
    element.scroll_into_view_if_needed()

    # Take a screenshot for visual verification.
    page.screenshot(path="jules-scratch/verification/binpay-card-verification.png")