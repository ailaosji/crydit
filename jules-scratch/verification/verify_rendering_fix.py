import time
from playwright.sync_api import sync_playwright, expect
import re

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:4322")

        # Wait for the table to have at least one row.
        table_body = page.locator("#card-table-body")
        expect(table_body.locator("tr").first).to_be_visible(timeout=10000)

        # Find the row for "MetaMask Card"
        metamask_row = table_body.locator("tr:has-text('MetaMask Card')")
        expect(metamask_row).to_be_visible()
        print("Found MetaMask Card row.")

        # --- Verification for each column ---

        # 1. Virtual Card Column (index 1)
        virtual_card_cell = metamask_row.locator("td").nth(1)
        expect(virtual_card_cell.locator("span:has-text('MASTERCARD')")).to_be_visible()
        # Make the price locator more specific
        expect(virtual_card_cell.locator("div.text-xs:has-text('免费')")).to_be_visible()
        print("✓ Virtual Card column is correct.")

        # 2. Physical Card Column (index 2)
        physical_card_cell = metamask_row.locator("td").nth(2)
        expect(physical_card_cell.locator("span:has-text('MASTERCARD')")).to_be_visible()
        # Make the price locator more specific
        expect(physical_card_cell.locator("div.text-xs:has-text('$0.00')")).to_be_visible()
        print("✓ Physical Card column is correct.")

        # 3. Fees Column (index 3)
        fees_cell = metamask_row.locator("td").nth(3)
        expect(fees_cell).to_have_text("免费")
        print("✓ Fees column is correct.")

        # 4. Annual Fee Column (index 4)
        annual_fee_cell = metamask_row.locator("td").nth(4)
        expect(annual_fee_cell).to_have_text("$199/年")
        print("✓ Annual Fee column is correct.")

        # Take a screenshot for visual confirmation
        page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png", full_page=True)

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
