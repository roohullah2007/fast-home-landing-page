#!/bin/bash
# Script to fix line break issues in JavaScript/React files

echo "Clearing Vite cache and node_modules cache..."

# Remove Vite cache
rm -rf node_modules/.vite

# Clear npm cache
npm cache clean --force

echo "Cache cleared. Now restart your development server with:"
echo "npm run dev"

echo ""
echo "If issues persist, also try:"
echo "1. Stop the dev server (Ctrl+C)"
echo "2. Run: rm -rf node_modules && npm install"
echo "3. Run: npm run dev"