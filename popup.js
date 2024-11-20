document.addEventListener('DOMContentLoaded', function() {
    const ssidInput = document.getElementById('ssid');
    const passwordInput = document.getElementById('password');
    const encryptionSelect = document.getElementById('encryption');
    const generateBtn = document.getElementById('generateBtn');
    const saveBtn = document.getElementById('saveBtn');
    const qrcodeDiv = document.getElementById('qrcode');
  
    // Function to generate WiFi QR Code
    function generateWiFiQRCode() {
      const ssid = ssidInput.value;
      const password = passwordInput.value;
      const encryption = encryptionSelect.value;
  
      if (!ssid) {
        alert('Please enter WiFi name (SSID)');
        return null;
      }
  
      // Generate QR Code string for WiFi
      let qrString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
  
      // Generate QR Code
      const qr = qrcode(0, 'M');
      qr.addData(qrString);
      qr.make();
  
      return qr.createImgTag(5);
    }
  
    // Generate QR Code button handler
    generateBtn.addEventListener('click', function() {
      const qrCodeImg = generateWiFiQRCode();
      if (qrCodeImg) {
        qrcodeDiv.innerHTML = qrCodeImg;
      }
    });
  
    // Save QR Code button handler
    saveBtn.addEventListener('click', function() {
      const ssid = ssidInput.value;
      const qrCodeImg = generateWiFiQRCode();
      
      if (qrCodeImg) {
        // Save to localStorage
        const savedCodes = JSON.parse(localStorage.getItem('wifiQRCodes') || '[]');
        savedCodes.push({
          ssid: ssid,
          qrCode: qrCodeImg,
          timestamp: new Date().toISOString()
        });
  
        localStorage.setItem('wifiQRCodes', JSON.stringify(savedCodes));
        alert('QR Code saved successfully!');
      }
    });
  });