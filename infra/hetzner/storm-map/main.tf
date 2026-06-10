data "hcloud_ssh_key" "jimmy" {
  name = var.ssh_key_name
}

# ── Private Network ───────────────────────────────────────────────────────────
resource "hcloud_network" "private" {
  name     = "storm-map-private"
  ip_range = "10.30.0.0/16"
}

resource "hcloud_network_subnet" "subnet" {
  network_id   = hcloud_network.private.id
  type         = "cloud"
  network_zone = "us-east" # Zone for Ashburn, VA
  ip_range     = "10.30.1.0/24"
}

# ── Firewall ──────────────────────────────────────────────────────────────────
resource "hcloud_firewall" "web" {
  name = "fw-storm-map-web"

  # Inbound HTTP (80)
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  # Inbound HTTPS (443)
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  # Inbound SSH (22)
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = var.bootstrap_mode ? [
      "0.0.0.0/0",
      "::/0"
      ] : [
      "${var.my_public_ip}/32"
    ]
  }

  # Inbound Coolify Admin Setup (8000)
  dynamic "rule" {
    for_each = var.bootstrap_mode ? [1] : []
    content {
      direction  = "in"
      protocol   = "tcp"
      port       = "8000"
      source_ips = ["0.0.0.0/0", "::/0"]
    }
  }
}

# ── Server ────────────────────────────────────────────────────────────────────
resource "hcloud_server" "web" {
  name         = var.server_name
  image        = var.image
  server_type  = var.server_type
  location     = var.location
  ssh_keys     = [data.hcloud_ssh_key.jimmy.id]
  firewall_ids = [hcloud_firewall.web.id]

  labels = {
    app   = "storm-map"
    env   = "production"
    owner = "jimmy"
    role  = "web"
  }
}

# Attach server to private subnet with a static IP
resource "hcloud_server_network" "web_network" {
  server_id = hcloud_server.web.id
  subnet_id = hcloud_network_subnet.subnet.id
  ip        = "10.30.1.10"
}
