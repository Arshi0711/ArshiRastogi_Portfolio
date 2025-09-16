import re
import unicodedata

def generate_slug(text: str) -> str:
    """Generate URL-friendly slug from text"""
    # Convert to lowercase and normalize unicode
    text = unicodedata.normalize('NFKD', text.lower())
    
    # Remove non-ASCII characters
    text = text.encode('ascii', 'ignore').decode('ascii')
    
    # Replace spaces and special characters with hyphens
    text = re.sub(r'[^a-z0-9]+', '-', text)
    
    # Remove leading/trailing hyphens
    text = text.strip('-')
    
    # Remove multiple consecutive hyphens
    text = re.sub(r'-+', '-', text)
    
    return text

def ensure_unique_slug(slug: str, existing_slugs: list) -> str:
    """Ensure slug is unique by appending number if needed"""
    if slug not in existing_slugs:
        return slug
    
    counter = 1
    while f"{slug}-{counter}" in existing_slugs:
        counter += 1
    
    return f"{slug}-{counter}"