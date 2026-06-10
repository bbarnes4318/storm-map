#!/usr/bin/env bash
# ==============================================================================
# 01-install-coolify.sh — Install Coolify deployment manager
# Run as: root
# ==============================================================================

set -euo pipefail

echo "=== Installing Coolify ==="

# Check if Coolify is already installed
if [ -d /data/coolify ] || docker ps --format '{{.Names}}' | grep -q "coolify"; then
  echo "Coolify appears to be already installed on this server."
else
  echo "Downloading and executing Coolify installer..."
  curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
fi

# Retrieve public IP address
PUBLIC_IP=$(curl -s https://api.ipify.org || curl -s https://ifconfig.me || echo "SERVER_PUBLIC_IP")

echo "=== Coolify Setup Instructions ==="
echo "Coolify is now installed and starting up."
echo "Access the Coolify admin portal at:"
echo "http://${PUBLIC_IP}:8000"
echo ""
echo "WARNING: Access this portal immediately and create the FIRST admin account."
echo "The first registration sets the primary administrator; leaving it open is a security risk."
echo ""
echo "WARNING: After creating the admin and mapping your domain (https://coolify.aurumshield.vip),"
echo "you must run the lockdown script to close port 8000 and restrict SSH."
echo "=========================================="
