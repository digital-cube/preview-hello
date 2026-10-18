#!/usr/bin/env bash
# Runner box setup hook (thilo.ai doc 179 § The project's setup script):
# runs in the box before the first session, so the preview's first start
# does not wait on a cold npm install.
set -euo pipefail
cd "$(dirname "$0")/../.."
npm install --no-fund --no-audit
