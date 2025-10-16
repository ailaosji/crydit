from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the homepage and wait for it to be fully loaded
        page.goto("http://localhost:4321", wait_until="networkidle", timeout=60000)

        # Find the specific container for the BinPay Card
        binpay_card_container = page.locator(".bg-white.rounded-2xl.shadow-lg", has_text="BinPay Card")

        # Scroll to the card to trigger loading
        binpay_card_container.scroll_into_view_if_needed()

        # Locate the skeleton loader within that specific card
        skeleton_loader = binpay_card_container.locator(".card-skeleton")

        # Wait for the skeleton loader to disappear (max 15 seconds).
        # This confirms the loading process has finished (either success or error).
        expect(skeleton_loader).to_be_hidden(timeout=15000)

        # Now that loading is done, the image should be visible.
        final_image = binpay_card_container.locator("img[alt='BinPay Card Card']")
        expect(final_image).to_be_visible()

        # Take a screenshot of the whole featured section for confirmation
        featured_cards_section = page.locator("section:has(h2:has-text('年度最佳U卡'))")
        featured_cards_section.screenshot(path="jules-scratch/verification/binpay_card_update_final.png")

        browser.close()

if __name__ == "__main__":
    run_verification()