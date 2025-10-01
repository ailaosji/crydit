from playwright.sync_api import sync_playwright, Page, expect

def verify_binpay_card(page: Page):
    """
    This test verifies that the Binpay card page is rendered correctly.
    """
    # 1. Arrange: Go to the Binpay card page.
    page.goto("http://localhost:4321/cards/binpay-card")

    # 2. Assert: Check for the presence of key elements on the page.
    # We expect the page title to be "Binpay Card - 全球支付解决方案".
    expect(page).to_have_title("Binpay Card - 全球支付解决方案")

    # We expect the main heading to be "Binpay Card 评测".
    heading = page.get_by_role("heading", name="Binpay Card 评测")
    expect(heading).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_binpay_card(page)
        browser.close()

if __name__ == "__main__":
    main()