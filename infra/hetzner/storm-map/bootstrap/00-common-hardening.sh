#!/usr/bin/env bash
# ==============================================================================
# 00-common-hardening.sh — System Hardening & Dependencies
# OS Target: Ubuntu 24.04
# Run as: root
# ==============================================================================

set -euo pipefail

echo "=== Starting Hardening & Setup (Ubuntu 24.04 Safe) ==="

# 1. Timezone Setup
echo "Setting timezone to America/New_York..."
timedatectl set-timezone America/New_York

# 2. Package Updates
echo "Updating package lists and upgrading base packages..."
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get upgrade -y

# 3. Essential Tools
echo "Installing utilities..."
apt-get install -y \
  curl \
  wget \
  git \
  jq \
  ca-certificates \
  gnupg \
  ufw \
  fail2ban \
  unzip \
  htop \
  ncdu \
  lsof \
  net-tools

# 4. Deploy User Creation
if ! id "deploy" &>/dev/null; then
  echo "Creating deploy user..."
  useradd -m -s /bin/bash deploy
  usermod -aG sudo deploy
  # Setup passwordless sudo for deployment tools (Coolify/Docker management)
  echo "deploy ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/deploy
  chmod 0440 /etc/sudoers.d/deploy
  
  # Copy authorized_keys from root to deploy user
  if [ -d /root/.ssh ] && [ -f /root/.ssh/authorized_keys ]; then
    mkdir -p /home/deploy/.ssh
    cp /root/.ssh/authorized_keys /home/deploy/.ssh/
    chown -R deploy:deploy /home/deploy/.ssh
    chmod 700 /home/deploy/.ssh
    chmod 600 /home/deploy/.ssh/authorized_keys
  fi
else
  echo "deploy user already exists."
fi

# 5. Docker Installation
if ! command -v docker &>/dev/null; then
  echo "Installing Docker Engine..."
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null
  
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
else
  echo "Docker is already installed."
fi

# 6. Enable Docker Service
systemctl enable docker
systemctl start docker

# 7. UFW Configuration
echo "Configuring firewall (UFW)..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH temporary'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw allow 8000/tcp comment 'Coolify setup temporary'
echo "y" | ufw enable

# 8. fail2ban Setup
echo "Enabling fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

echo "=== System Summary ==="
echo "Time: $(date)"
echo "Docker version: $(docker --version)"
echo "UFW Status:"
ufw status verbose
echo "Hardening step completed. Do NOT disable root SSH yet until deploy user SSH is verified."
