import os
import re

def migrate_card_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter and body
    parts = content.split('---')
    if len(parts) < 3:
        print(f"  Skipping {filepath}: Not a valid frontmatter file.")
        return

    frontmatter = parts[1]
    body = "---".join(parts[2:])

    # --- Apply transformations ---

    # 1. Remove tiers
    frontmatter = re.sub(r'tiers:.*', '', frontmatter, flags=re.DOTALL)

    # 2. Determine new cardType and remove old fields
    is_virtual = 'isVirtual: true' in frontmatter
    is_physical = 'isPhysical: true' in frontmatter

    new_card_type = 'null'
    if is_virtual and is_physical:
        new_card_type = 'both'
    elif is_virtual:
        new_card_type = 'virtual'
    elif is_physical:
        new_card_type = 'physical'

    frontmatter = re.sub(r'isVirtual:.*\n', '', frontmatter)
    frontmatter = re.sub(r'isPhysical:.*\n', '', frontmatter)

    # 3. Rename cardType to network
    frontmatter = re.sub(r'cardType:(.*)\n', r'network:\1\ncardType: '+ new_card_type +'\n', frontmatter)

    # Clean up extra newlines
    frontmatter = os.linesep.join([s for s in frontmatter.splitlines() if s])

    # Reassemble the file
    new_content = f"---\n{frontmatter}\n---\n{body}"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  Finished {filepath}")

def main():
    card_dir = 'src/content/cards'
    files_to_migrate = [
        'metamask-card.md',
        'nexo-card.md',
        'payy-card.md',
        'ready-card.md',
        'stables-card.md',
        'trustee-card.md',
        'wirex-card.md',
    ]
    for filename in files_to_migrate:
        filepath = os.path.join(card_dir, filename)
        if os.path.exists(filepath):
            migrate_card_file(filepath)
        else:
            print(f"File not found: {filepath}")

if __name__ == "__main__":
    main()
