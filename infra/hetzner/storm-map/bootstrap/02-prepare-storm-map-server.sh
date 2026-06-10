#!/usr/bin/env bash
# ==============================================================================
# 02-prepare-storm-map-server.sh — Directory setup for application volumes
# Run as: root
# ==============================================================================

set -euo pipefail

echo "=== Preparing Storm Map Directory Structure ==="

# Define target paths
BASE_DIR="/data/storm-map"
DIRS=(
  "logs"
  "tmp"
)

# Create base directory if missing
if [ ! -d "$BASE_DIR" ]; then
  mkdir -p "$BASE_DIR"
  echo "Created base directory: $BASE_DIR"
fi

# Create subdirectories with restrictive permissions
for dir in "${DIRS[@]}"; do
  path="${BASE_DIR}/${dir}"
  if [ ! -d "$path" ]; then
    mkdir -p "$path"
    echo "Created: $path"
  fi
done

# Set permissions
# - Directories should be readable/writable by deploy user (UID 1001) or root.
echo "Adjusting ownership and permissions..."
chmod 700 "$BASE_DIR"
chmod -R 700 "$BASE_DIR/logs" "$BASE_DIR/tmp"

# Make deploy the owner of base directory for compose operations
chown deploy:sudo "$BASE_DIR"

echo "=== Directory Verification ==="
ls -la "$BASE_DIR"

echo "Directories prepared successfully."
