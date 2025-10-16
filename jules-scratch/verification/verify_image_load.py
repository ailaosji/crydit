from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the homepage
        page.goto("http://localhost:4321")

        # Wait for the image to be loaded
        page.wait_for_selector("img[alt='BinPay Card Card']")

        # Take a screenshot of the section
        featured_cards_section = page.locator("section:has(h2:has-text('年度最佳U卡'))")
        featured_cards_section.screenshot(path="jules-scratch/verification/success.png")

        browser.close()

if __name__ == "__main__":
    run_verification()