#!/usr/bin/env bash
# Downloads the exported images from the Figma file into public/assets.
# Icons are not downloaded: they are drawn in src/components/Icon.jsx.
#
# These URLs come from Figma's MCP server and are TEMPORARY (they expire ~7 days
# after they were generated). If a download fails, re-export the asset from
# Figma (or ask Claude to regenerate this list) and save it under the same name.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/assets

BASE="https://www.figma.com/api/mcp/asset"
get() { # get <filename> <uuid.ext>
  echo "→ $1"
  curl -fsSL "$BASE/$2" -o "public/assets/$1"
}

# Images
get seal.png               eecfb4ab-f089-4562-ba9d-6bb60206c702.png
get c5-before.png          50841076-516e-4d84-9ff2-9f83e3f0dcd9.png
get c5-after.png           2d8fc0d1-a75f-444a-81c6-5f3da7e7bd74.png
get about-photo.png        4fc7e48c-811f-45c0-acd4-f765718e5215.png
get about-photo-mobile.png 68d2a8fd-836c-4717-8daa-a34187d7d4f3.png
get cs-before.png          bfea5420-c35c-4a07-bf64-976e62f5c33e.png
get cs-after.png           e828bcc8-8ee7-4c74-b413-65cd167e43dd.png

echo "Done. Assets saved to public/assets"
