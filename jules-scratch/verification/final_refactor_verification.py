import time
from playwright.sync_api import sync_playwright, expect
import re

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:4321")

        # 1. Wait for the table to have at least one row.
        table_body = page.locator("#card-table-body")
        expect(table_body.locator("tr").first).to_be_visible(timeout=15000)
        print("✓ Table has initially loaded with server-side rendered data.")

        # 2. Check a server-rendered card (Payy Card should be in the initial list)
        payy_row = table_body.locator("tr:has-text('Payy Card')")
        expect(payy_row).to_be_visible()
        print("Found Payy Card row.")

        # Check physical card cell for Payy, which has a null price. Should show "免费" (Free).
        physical_cell_payy = payy_row.locator("td").nth(2)
        expect(physical_cell_payy).to_contain_text("免费")
        print("✓ Payy Card with null price renders correctly.")

        # 3. Scroll to the bottom to load all cards via client-side script.
        end_indicator = page.locator("#end-indicator")
        # Scroll until the end indicator is visible
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        expect(end_indicator).to_be_visible(timeout=10000)
        print("✓ All cards loaded after scrolling.")

        # 4. Verify Crypto.com Card (which is likely loaded by client)
        crypto_com_row = table_body.locator("tr:has-text('Crypto.com Card')")
        expect(crypto_com_row).to_be_visible()
        print("Found Crypto.com Card row.")

        # Check discussion bubble
        discussion_cell_crypto = crypto_com_row.locator("td").nth(5)
        bubble_link_crypto = discussion_cell_crypto.locator("a")
        expect(bubble_link_crypto).to_have_text("89")
        print("✓ Discussion bubble for Crypto.com Card is correct.")

        # 5. Take a screenshot for final visual confirmation
        page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
        print("✓ Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png", full_page=True)

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
