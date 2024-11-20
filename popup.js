// Wrap everything in a module pattern to avoid global scope pollution
(function() {
  // Wait for DOM to be fully loaded
  function initializeExtension() {
    const ssidInput = document.getElementById('ssid');
    const passwordInput = document.getElementById('password');
    const encryptionSelect = document.getElementById('encryption');
    const generateBtn = document.getElementById('generateBtn');
    const saveBtn = document.getElementById('saveBtn');
    const viewSavedBtn = document.getElementById('viewSavedBtn');
    const qrcodeDiv = document.getElementById('qrcode');

    // Safely check if qrcode function exists
    function isQRCodeAvailable() {
      return typeof window.qrcode === 'function';
    }

    // Function to generate WiFi QR Code
    function generateWiFiQRCode() {
      const ssid = ssidInput.value;
      const password = passwordInput.value;
      const encryption = encryptionSelect.value;

      if (!ssid) {
        alert('Please enter WiFi name (SSID)');
        return null;
      }

      // Check if qrcode is available
      if (!isQRCodeAvailable()) {
        console.error('QR Code generator not loaded');
        alert('Error: QR Code generator not loaded');
        return null;
      }

      // Generate QR Code string for WiFi
      const qrString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;

      try {
        // Use window.qrcode to be explicit
        const qr = window.qrcode(0, 'M');
        qr.addData(qrString);
        qr.make();

        return qr.createImgTag(5);
      } catch (error) {
        console.error('QR Code generation error:', error);
        alert('Error generating QR Code');
        return null;
      }
    }

    // Event listener for Generate QR Code
    generateBtn.addEventListener('click', function() {
      const qrCodeImg = generateWiFiQRCode();
      if (qrCodeImg) {
        qrcodeDiv.innerHTML = qrCodeImg;
      }
    });

    // Event listener for Save QR Code
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

    // Event listener for View Saved Codes
    viewSavedBtn.addEventListener('click', function() {
      // Open saved-codes.html in a new tab
      chrome.tabs.create({ url: 'saved-codes.html' });
    });
  }

  // Use DOMContentLoaded to ensure all elements are loaded
  document.addEventListener('DOMContentLoaded', initializeExtension);
})();

