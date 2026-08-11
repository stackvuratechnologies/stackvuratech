# StackVura Technologies | Infrastructure as Code (IaC)

This directory contains the proprietary deployment blueprints for **StackVura Technologies**. It demonstrates our standard DevSecOps pipeline for provisioning highly available, containerized environments on AWS or similar VPS infrastructure.

## Architecture Overview
*   **Frontend:** Next.js Server-Side Rendered application running via Docker.
*   **Automation Backend:** n8n workflow engine containerized with persistent localized storage.
*   **Reverse Proxy:** Nginx handling deep traffic routing and WebSocket connections.
*   **Security Layer:** 
    *   Strict SSL/TLS enforcement via Let's Encrypt (Certbot).
    *   Administrative SSH access locked down behind a Zero-Trust Tailscale mesh network.

## Author
**Moses Kariuki Mwihia**
*Lead Cloud & Web3 Architect*
