import time
from playwright.sync_api import sync_playwright, expect
import re

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:4321")

        # 1. Wait for the table body to be visible.
        table_body = page.locator("#card-table-body")
        expect(table_body).to_be_visible(timeout=10000)
        print("✓ Table body is visible.")

        # 2. Check that all 8 cards were rendered by the server.
        # The new code renders all cards if there are fewer than 15.
        # There are 8 card files in total.
        rows = table_body.locator("tr")
        expect(rows).to_have_count(8)
        print("✓ Correct number of initial server-rendered cards found (8).")

        # 3. Verify that the 'data-server-rendered' attribute is present.
        first_row = rows.first
        expect(first_row).to_have_attribute("data-server-rendered", "true")
        print("✓ `data-server-rendered` attribute is present, confirming SSR.")

        # 4. Do a spot check on the "Annual Fee" column for MetaMask card to ensure logic is correct.
        metamask_row = table_body.locator("tr:has-text('MetaMask Card')")
        annual_fee_cell = metamask_row.locator("td").nth(4)
        expect(annual_fee_cell).to_contain_text("收费") # "收费" means "Charged"
        print("✓ MetaMask annual fee rendering is correct.")

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
