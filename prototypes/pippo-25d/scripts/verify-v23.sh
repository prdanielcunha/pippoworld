#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
for file in dist/*.js; do node --check "$file"; done
for test in tests/*.cjs; do node "$test"; done
python3 tests/continuous-body.py
python3 tests/prepared-music-layers.py
python3 tests/recorded-assets.py
python3 tests/activity-assets.py
python3 scripts/verify-v23-assets.py
git diff --check
