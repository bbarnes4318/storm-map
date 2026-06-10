output "storm_map_public_ipv4" {
  value       = hcloud_server.web.ipv4_address
  description = "The public IPv4 address of the Storm Map web server."
}

output "storm_map_private_ipv4" {
  value       = hcloud_server_network.web_network.ip
  description = "The private network IPv4 address of the Storm Map web server."
}

output "storm_map_server_id" {
  value       = hcloud_server.web.id
  description = "The ID of the Hetzner Cloud server."
}

output "storm_map_firewall_id" {
  value       = hcloud_firewall.web.id
  description = "The ID of the Hetzner Cloud firewall."
}

output "storm_map_network_id" {
  value       = hcloud_network.private.id
  description = "The ID of the private network."
}

output "ssh_command" {
  value       = "ssh -i \"$env:USERPROFILE\\.ssh\\hetzner_pvn\" root@${hcloud_server.web.ipv4_address}"
  description = "PowerShell SSH command to connect to the server."
}
