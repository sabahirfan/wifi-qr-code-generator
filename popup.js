// Wrap everything in a module pattern to avoid global scope pollution
(function () {
  // Function to initialize the extension
  function initializeExtension() {
    const ssidInput = document.getElementById('ssid');
    const passwordInput = document.getElementById('password');
    const encryptionSelect = document.getElementById('encryption');
    const generateBtn = document.getElementById('generateBtn');
    const saveBtn = document.getElementById('saveBtn');
    const viewSavedBtn = document.getElementById('viewSavedBtn');
    const printBtn = document.getElementById('printBtn'); // Reference to Print button
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
    generateBtn.addEventListener('click', function () {
      const qrCodeImg = generateWiFiQRCode();
      if (qrCodeImg) {
        qrcodeDiv.innerHTML = qrCodeImg;
      }
    });

    // Event listener for Save QR Code
    saveBtn.addEventListener('click', function () {
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
    viewSavedBtn.addEventListener('click', function () {
      // Open saved-codes.html in a new tab
      chrome.tabs.create({ url: 'saved-codes.html' });
    });

    // Event listener for Print QR Code
    printBtn.addEventListener('click', function () {
      // Check if a QR Code is available
      if (!qrcodeDiv.innerHTML.trim() || !qrcodeDiv.querySelector('img')) {
        alert('Please generate a QR Code before printing.');
        return;
      }

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
              }
              img {
                max-width: 900px; /* Increase the size here */
                height: auto;
              }
            </style>
          </head>
          <body>
            ${qrcodeDiv.innerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    });
  }

  // Use DOMContentLoaded to ensure all elements are loaded
  document.addEventListener('DOMContentLoaded', initializeExtension);
})();
