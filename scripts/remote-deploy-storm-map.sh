#!/usr/bin/env bash
# ==============================================================================
# remote-deploy-storm-map.sh
# ==============================================================================
# Executed on Hetzner server to deploy the uploaded Storm Map release.
# ==============================================================================
set -euo pipefail

echo "========================================================"
echo "Starting Storm Map Direct Server Deployment..."
echo "========================================================"

# Define directories
RELEASE_DIR="/opt/storm-map/releases"
CURRENT_SYM="/opt/storm-map/current"
TARBALL="/tmp/storm-map-deploy.tar"

# 1. Ensure required server-side directories exist
echo "Creating required directories..."
mkdir -p "${RELEASE_DIR}"

# 2. Verify upload archive exists
if [ ! -f "${TARBALL}" ]; then
  echo "ERROR: Uploaded deployment tarball not found at: ${TARBALL}" >&2
  exit 1
fi

# 3. Generate release timestamp
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
TARGET_RELEASE="${RELEASE_DIR}/${TIMESTAMP}"
echo "Deploying to new release directory: ${TARGET_RELEASE}"
mkdir -p "${TARGET_RELEASE}"

# 4. Extract tarball
echo "Extracting release..."
tar -xf "${TARBALL}" -C "${TARGET_RELEASE}"

# 4b. Copy server-side persistent .env file if present
if [ -f "/opt/storm-map/.env" ]; then
  echo "Copying server-side .env to release..."
  cp "/opt/storm-map/.env" "${TARGET_RELEASE}/.env"
fi

# 5. Symlink current to new release
echo "Updating active symlink: ${CURRENT_SYM} -> ${TARGET_RELEASE}"
ln -sfn "${TARGET_RELEASE}" "${CURRENT_SYM}"

# 6. Build and start containers
echo "Starting containers (building app container)..."
cd "${CURRENT_SYM}"
docker compose up -d --build

echo "========================================================"
echo "Deployment completed successfully!"
echo "========================================================"

# 7. Display container status
docker compose ps
echo "Clean up temporary tarball..."
rm -f "${TARBALL}"
