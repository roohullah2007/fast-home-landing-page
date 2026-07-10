#!/bin/bash

echo "📦 Installing Performance Optimization Packages..."

npm install --save-dev vite-plugin-compression2
npm install --save-dev babel-plugin-transform-remove-imports
npm install --save-dev rollup-plugin-visualizer

echo "✅ Performance packages installed!"
echo ""
echo "📝 Next steps:"
echo "1. Run: npm run build"
echo "2. Run: node scripts/convert-images-to-webp.js"
echo "3. Check PERFORMANCE_OPTIMIZATION.md for full guide"
