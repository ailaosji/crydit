import re
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Go to the cards list page
    page.goto("http://localhost:8000/cards/index.html", wait_until="networkidle")

    # Wait for the table to be populated by the client-side script
    # We'll wait for the link we want to click to appear.
    crypto_com_link = page.get_by_role("link", name="Crypto.com Card")
    expect(crypto_com_link).to_be_visible(timeout=15000)

    # 2. Take a screenshot of the main card table
    page.screenshot(path="jules-scratch/verification/01_cards_page.png", full_page=True)
    print("Screenshot of cards list page taken.")

    # 3. Navigate directly to the card detail page URL
    page.goto("http://localhost:8000/cards/crypto-com-card/index.html", wait_until="networkidle")

    # Scroll down to the comparison section to make sure it's in view
    tier_comparison_heading = page.get_by_role("heading", name="各等级卡片权益对比")
    expect(tier_comparison_heading).to_be_visible(timeout=10000)
    tier_comparison_heading.scroll_into_view_if_needed()
    page.wait_for_timeout(1000)

    # 4. Take a screenshot of the detail page (grid view)
    page.screenshot(path="jules-scratch/verification/02_card_detail_grid.png", full_page=True)
    print("Screenshot of card detail (grid view) taken.")

    # 5. Find the "table view" button and click it
    table_view_button = page.get_by_role("button", name="表格视图")
    table_view_button.click()

    # 6. Wait for the table to be visible
    comparison_table = page.get_by_role("table")
    expect(comparison_table).to_be_visible()
    page.wait_for_timeout(500)

    # 7. Take a screenshot of the detail page (table view)
    page.screenshot(path="jules-scratch/verification/03_card_detail_table.png", full_page=True)
    print("Screenshot of card detail (table view) taken.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
