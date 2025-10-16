from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the homepage and wait for the network to be idle
        page.goto("http://localhost:4321", wait_until="networkidle")

        # Locate the specific image for BinPay Card
        binpay_card_image = page.locator("img[alt='BinPay Card Card']")

        # Scroll the image into view
        binpay_card_image.scroll_into_view_if_needed()

        # Wait for the image to be fully visible (opacity: 1) after loading
        expect(binpay_card_image).to_have_css("opacity", "1", timeout=15000)

        # Take a screenshot of the featured cards section
        featured_cards_section = page.locator("section:has(h2:has-text('年度最佳U卡'))")
        featured_cards_section.screenshot(path="jules-scratch/verification/binpay_card_update.png")

        browser.close()

if __name__ == "__main__":
    run_verification()