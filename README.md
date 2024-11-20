### Wifi QR Code Generator ###

A Chrome extension for generating WiFi QR codes with the following features:

#### Secure Generation: #### 

QR codes are generated entirely in the browser
No data is transmitted to external servers
Uses client-side JavaScript


#### Features: #### 

Input for WiFi SSID
Password input
Encryption type selection (WPA, WEP, No Password)
Generate QR Code button
Save QR Code button
Saved codes page to view and manage previous QR codes


####  Implementation Details: #### 

Uses qrcode-generator library for QR code creation
Stores saved codes in browser's localStorage
Supports saving multiple WiFi QR codes
Simple, clean UI



####  How to Install: #### 

Create a new directory for the extension
Save the provided files (manifest.json, popup.html, popup.js, saved-codes.html)
Add icon images (16x16, 48x48, 128x128 PNG)
Open Chrome and go to chrome://extensions/
Enable "Developer mode"
Click "Load unpacked" and select the extension directory

####  Security Notes: #### 

QR codes are generated locally
Data is stored in localStorage
No external API calls
You can review the code to verify security