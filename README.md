# Discord Server Widget Integration

This project demonstrates how to embed a live Discord server widget into a website. The widget allows visitors to see the online status of members and join the server directly.

## Setup Instructions

1. **Enable the Widget in Discord:**
   - Open your Discord Server.
   - Go to **Server Settings** > **Widget**.
   - Toggle **Enable Server Widget** to ON.
   - Select an **Invite Channel**.

2. **Implementation:**
   - Copy the `<iframe>` code from `index.html` (or your main file).
   - Replace the `id=1370394626476867696` with your own Server ID if necessary.

## Customization
You can modify the following parameters in the `<iframe>` URL:
- `theme`: Set to `dark` or `light`.
- `width`: Adjust the width (default is 350).
- `height`: Adjust the height (default is 500).

## Files
- `index.html`: Contains the embed code.
- `LICENSE`: MIT License information.