### Wifi QR Code Generator ###

A Chrome extension for generating WiFi QR codes with the following features:

[![trophy](https://github-profile-trophy.vercel.app/?username=sabahirfan)](https://github.com/ryo-ma/github-profile-trophy)

#### Secure Generation: #### 

- QR codes are generated entirely in the browser
- No data is transmitted to external servers
- Uses client-side JavaScript


#### Features: #### 

- Input for WiFi SSID
- Password input
- Encryption type selection (WPA, WEP, No Password)
- Generate QR Code button
- Save QR Code button
- Saved codes page to view and manage previous QR codes


####  Implementation Details: #### 

- Uses qrcode-generator library for QR code creation
- Stores saved codes in browser's localStorage
- Supports saving multiple WiFi QR codes
- Simple, clean UI


####  How to Install: #### 

- Open Chrome and go to chrome://extensions/
- Enable "Developer mode"
- Click "Load unpacked" and select the extension directory

####  Security Notes: #### 

- QR codes are generated locally
- Data is stored in localStorage
- No external API calls
