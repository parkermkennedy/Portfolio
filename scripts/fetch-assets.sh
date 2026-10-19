#!/usr/bin/env bash
# Downloads the exported images/icons from the Figma file into public/assets.
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
get nextgen-desktop.png    12daeb25-89b9-474b-a365-8ba2fd5c90a2.png
get nextgen-mobile.png     54cc28cd-4080-4857-877b-e4951a2fcd86.png
get c5-before.png          50841076-516e-4d84-9ff2-9f83e3f0dcd9.png
get c5-after.png           2d8fc0d1-a75f-444a-81c6-5f3da7e7bd74.png
get about-photo.png        4fc7e48c-811f-45c0-acd4-f765718e5215.png
get about-photo-mobile.png 68d2a8fd-836c-4717-8daa-a34187d7d4f3.png
get cs-before.png          bfea5420-c35c-4a07-bf64-976e62f5c33e.png
get cs-after.png           e828bcc8-8ee7-4c74-b413-65cd167e43dd.png

# Icons (SVG)
get arrow-ext.svg          974f26ad-306c-46a9-b429-2450ad5864bf.svg
get arrow-external.svg     a4d44487-a647-47a3-baa0-24a05737ad27.svg
get arrow-right.svg        1acce703-3ef0-4613-a546-0e61c1b00165.svg
get arrow-down.svg         72c422c9-70b6-4084-b189-d2d054d77163.svg
get arrow-left.svg         84e6243f-60c8-431f-8443-7fc7bff1331c.svg
get lock.svg               daf931af-fbb4-49e8-b665-e822420c73fb.svg
get menu-button.svg        81793f47-e004-4d41-940c-43c3d8ac566d.svg

echo "Done. Assets saved to public/assets"
