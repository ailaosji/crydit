import time
from playwright.sync_api import sync_playwright, expect
import re

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:4321")

        # 1. Wait for the server-rendered rows to be visible.
        table_body = page.locator("#card-table-body")
        expect(table_body.locator("tr")).to_have_count(8, timeout=10000)
        print("✓ Correct number of cards is visible (8).")

        # 2. Wait for client-side hydration to complete by checking the last row's discussion cell
        last_row = table_body.locator("tr").last
        last_discussion_cell = last_row.locator("td").nth(5)
        expect(last_discussion_cell.locator("a")).to_be_visible(timeout=10000)
        print("✓ Client-side hydration of comment counts appears complete.")

        # 3. Verify Stables Card (zero comments)
        stables_row = table_body.locator("tr:has-text('Stables Card')")
        expect(stables_row).to_be_visible()
        print("Found Stables Card row.")

        discussion_cell_stables = stables_row.locator("td").nth(5)
        icon_link_stables = discussion_cell_stables.locator("a")

        expect(icon_link_stables.locator("svg")).to_be_visible()
        expect(icon_link_stables).not_to_contain_text(re.compile(r'\d'))
        expect(icon_link_stables).to_have_attribute("href", "/cards/stables-card#giscus-comments")
        print("✓ Chat bubble icon for Stables Card is correct.")

        # 4. Verify Crypto.com Card (non-zero comments)
        crypto_com_row = table_body.locator("tr:has-text('Crypto.com Card')")
        expect(crypto_com_row).to_be_visible()
        print("Found Crypto.com Card row.")

        discussion_cell_crypto = crypto_com_row.locator("td").nth(5)
        bubble_link_crypto = discussion_cell_crypto.locator("a")

        expect(bubble_link_crypto).to_have_text("89")
        expect(bubble_link_crypto).to_have_attribute("href", "/cards/crypto-com-card#giscus-comments")
        print("✓ Discussion bubble for Crypto.com Card is correct.")

        # 5. Verify Avalanche Card Fee
        avalanche_row = table_body.locator("tr:has-text('Avalanche Card')")
        expect(avalanche_row).to_be_visible()
        print("Found Avalanche Card row.")

        fees_cell = avalanche_row.locator("td").nth(3)
        expect(fees_cell).to_have_text("浮动")
        print("✓ Avalanche Card fee calculation is correct.")

        # 6. Take a screenshot for final visual confirmation
        page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
        print("✓ Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png", full_page=True)

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
