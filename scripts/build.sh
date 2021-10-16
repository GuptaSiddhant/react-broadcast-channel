# Generate IIFE browser (index.js)
esbuild ./src/index.ts \
    --platform=browser \
    --outfile=./dist/index.js \
    --bundle --external:react \
    --minify

# Generate ESM module (index.mjs)
esbuild ./src/index.ts \
    --platform=neutral \
    --outfile=./dist/index.mjs \
    --bundle --external:react \
    --minify

# Generate CommonJS (index.cjs)
esbuild ./src/index.ts \
    --platform=node \
    --outfile=./dist/index.cjs \
    --bundle --external:react \
    --minify

# Generate .d.ts
tsc
