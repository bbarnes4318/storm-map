#!/usr/bin/env bash
# ==============================================================================
# 03-lockdown-after-bootstrap.sh — Firewall Lockdown (Post-Setup)
# Run as: root
# ==============================================================================

set -euo pipefail

# Ensure MY_PUBLIC_IP is defined
if [ -z "${MY_PUBLIC_IP:-}" ]; then
  echo "Error: The MY_PUBLIC_IP environment variable is not set."
  echo "Usage: MY_PUBLIC_IP=\"198.51.100.50\" ./03-lockdown-after-bootstrap.sh"
  exit 1
fi

echo "=== Commencing Firewall Lockdown ==="
echo "Target IP for restricted SSH: ${MY_PUBLIC_IP}"

# 1. Update UFW Rules
echo "Modifying UFW rules..."

# Remove temporary wide-open rules
ufw delete allow 8000/tcp || true
ufw delete allow 22/tcp || true

# Restrict SSH (port 22) to MY_PUBLIC_IP only
ufw allow from "${MY_PUBLIC_IP}" to any port 22 proto tcp comment 'SSH restricted'

# Ensure HTTP and HTTPS remain public
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# Reload firewall
echo "Reloading UFW..."
ufw reload

# 2. Print status
echo "=== UFW Status Post-Lockdown ==="
ufw status verbose

# 3. Reminder for Hetzner Cloud Console Firewall
echo ""
echo "======================================================================"
echo "CRITICAL MANUAL ACTION REQUIRED:"
echo "======================================================================"
echo "You MUST now update the Hetzner Cloud Firewall (fw-storm-map-web)"
echo "via the Hetzner Console or via Terraform by setting bootstrap_mode = false:"
echo ""
echo "1. DELETE the rule for port 8000."
echo "2. CHANGE the rule for port 22 (SSH) from 'Any IPv4' and 'Any IPv6'"
# Ensure HTTP/HTTPS remain public
echo "   to only allow your public IP: ${MY_PUBLIC_IP}/32."
echo "3. Confirm ports 80 and 443 remain set to Any IPv4 / Any IPv6."
echo "======================================================================"
