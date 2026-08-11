#!/bin/bash
# StackVura Technologies - DevSecOps Deployment Script
# This script automates the provisioning of our AWS EC2 environments.

echo "[+] Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "[+] Installing Docker & Docker Compose..."
sudo apt install -y docker.io docker-compose

echo "[+] Installing Nginx & Certbot for Zero-Trust SSL..."
sudo apt install -y nginx certbot python3-certbot-nginx

echo "[+] Securing Administrative Access via Tailscale..."
curl -fsSL https://tailscale.com/install.sh | sh

echo "[+] Deploying StackVura Infrastructure Containers..."
docker-compose up -d

echo "[+] Linking Nginx Configuration..."
sudo cp nginx-proxy.conf /etc/nginx/sites-available/stackvura
sudo ln -s /etc/nginx/sites-available/stackvura /etc/nginx/sites-enabled/
sudo systemctl restart nginx

echo "[+] Enforcing HTTPS Cryptography..."
sudo certbot --nginx -d stackvuratechnologies.online -d www.stackvuratechnologies.online -d n8n.stackvuratechnologies.online --non-interactive --agree-tos -m admin@stackvuratechnologies.online

echo "[+] Deployment Pipeline Complete. System Online."
