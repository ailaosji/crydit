import os
import yaml
from pathlib import Path

def parse_fee(fee_value):
    """Converts various fee formats to a number (percentage)."""
    if fee_value is None or isinstance(fee_value, bool):
        return 0
    if isinstance(fee_value, (int, float)):
        return fee_value
    if isinstance(fee_value, str):
        fee_str = fee_value.lower()
        if 'free' in fee_str or '免费' in fee_str:
            return 0
        if '%' in fee_str:
            try:
                return float(fee_str.replace('%', '').strip())
            except ValueError:
                return 0 # Default for un-parseable percentages
        try:
            return float(fee_str)
        except ValueError:
            return 0 # Default for other non-numeric strings like "浮动"
    return 0

def migrate_card_data():
    cards_dir = Path("src/content/cards")
    for filepath in cards_dir.glob("*.md"):
        print(f"Processing {filepath}...")

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        parts = content.split('---')
        if len(parts) < 3:
            print(f"  Skipping {filepath}, not a valid markdown file.")
            continue

        frontmatter_str = parts[1]
        body = "---".join(parts[2:])

        try:
            data = yaml.safe_load(frontmatter_str)
        except yaml.YAMLError as e:
            print(f"  Error parsing YAML in {filepath}: {e}")
            continue

        # --- Debugging ---
        print(f"  isVirtual: {data.get('isVirtual')}, type: {type(data.get('isVirtual'))}")
        print(f"  isPhysical: {data.get('isPhysical')}, type: {type(data.get('isPhysical'))}")
        # --- End Debugging ---

        # --- Data Transformation Logic ---
        new_data = {
            'name': data.get('name'),
            'issuer': data.get('issuer'),
            'description': data.get('description'),
            'shortDescription': data.get('shortDescription'),
            'hasVirtual': data.get('isVirtual', False),
            'hasPhysical': data.get('isPhysical', False),

            'depositFee': parse_fee(data.get('depositFee')),
            'transactionFee': parse_fee(data.get('transactionFee')),
            'withdrawalFee': parse_fee(data.get('withdrawalFee')),
            'monthlyFee': parse_fee(data.get('monthlyFee')),

            'supportedRegions': data.get('supportedRegions', []),
            'supportedCurrencies': data.get('supportedCurrencies', []),
            'kycRequired': data.get('kycRequired', True),
            'tags': data.get('tags', []),
            'status': data.get('status', 'active'),
            'featured': data.get('featured', False),
            'publishDate': data.get('publishDate'),
            'updateDate': data.get('updateDate'),
            'pros': data.get('pros', []),
            'cons': data.get('cons', []),
            'features': data.get('features', []),
        }

        if data.get('logo'):
            new_data['logo'] = data.get('logo')
        if data.get('affiliateLink'):
            new_data['affiliateLink'] = data.get('affiliateLink')
        if data.get('invitationCode'):
            new_data['invitationCode'] = data.get('invitationCode')

        # Nested virtual card info
        if new_data['hasVirtual']:
            new_data['virtualCard'] = {
                'price': data.get('virtualCardPrice', 0),
                'network': data.get('virtualNetwork'),
                'annualFee': parse_fee(data.get('virtualAnnualFee')),
            }
            if not new_data['virtualCard']['network']:
                 del new_data['virtualCard']['network']

        # Nested physical card info
        if new_data['hasPhysical']:
            new_data['physicalCard'] = {
                'price': data.get('physicalCardPrice', 0),
                'network': data.get('physicalNetwork'),
                'annualFee': parse_fee(data.get('physicalAnnualFee')),
            }
            if not new_data['physicalCard']['network']:
                 del new_data['physicalCard']['network']

        # --- End Transformation ---

        new_frontmatter_str = yaml.dump(new_data, allow_unicode=True, sort_keys=False, default_flow_style=False)

        new_content = f"---\n{new_frontmatter_str}---{body}"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"  Successfully migrated {filepath}.")

if __name__ == "__main__":
    migrate_card_data()
