#!/usr/bin/env python3
import requests
import json

BASE_URL = 'https://arshi-portfolio.preview.emergentagent.com/api'

print('🔍 Verifying seeded data content...')

# Check blog posts content
response = requests.get(f'{BASE_URL}/blog/posts')
if response.status_code == 200:
    data = response.json()
    posts = data.get('posts', [])
    print(f'✅ Found {len(posts)} blog posts')
    for post in posts:
        print(f'   - {post["title"]} (slug: {post["slug"]})')
else:
    print(f'❌ Blog posts request failed: {response.status_code}')

# Check projects content
response = requests.get(f'{BASE_URL}/projects')
if response.status_code == 200:
    data = response.json()
    projects = data.get('projects', [])
    print(f'✅ Found {len(projects)} projects')
    for project in projects:
        print(f'   - {project["title"]} (category: {project["category"]})')
else:
    print(f'❌ Projects request failed: {response.status_code}')

# Check consultation packages
response = requests.get(f'{BASE_URL}/consultation/packages')
if response.status_code == 200:
    data = response.json()
    packages = data.get('packages', {})
    print(f'✅ Found {len(packages)} consultation packages')
    for pkg_id, pkg_info in packages.items():
        print(f'   - Package {pkg_id}: {pkg_info["title"]} (${pkg_info["price_usd"]})')
else:
    print(f'❌ Packages request failed: {response.status_code}')