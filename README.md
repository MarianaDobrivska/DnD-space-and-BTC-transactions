# Interactive DnD Workspace & Bitcoin Transactions

## Overview

This project provides an interactive workspace for managing and organizing blocks, alongside real-time monitoring of Bitcoin transactions through WebSocket. The workspace allows users to drag, resize, and delete blocks, while the Bitcoin transaction page displays unconfirmed transactions from the Blockchain WebSocket API.

### Features

⚡️ **Workspace Management**

- Interactive blocks that can be dragged, resized, and reordered.
- Blocks are saved in local storage for persistence across sessions.
- Block data such as position, size, and visibility are configurable.

⚡️ **Bitcoin Transactions**

- Real-time monitoring of Bitcoin transactions using WebSocket.
- Displays unconfirmed transactions and their details like hash, amount, and addresses.
- The transaction list updates efficiently with throttling and debouncing for high-frequency data.
