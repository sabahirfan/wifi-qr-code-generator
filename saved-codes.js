document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('savedCodesContainer');
    const savedCodes = JSON.parse(localStorage.getItem('wifiQRCodes') || '[]');
  
    if (savedCodes.length === 0) {
      container.innerHTML = '<div class="no-saved-codes">No saved QR codes yet.</div>';
    } else {
      savedCodes.forEach((code, index) => {
        const codeDiv = document.createElement('div');
        codeDiv.className = 'saved-code';
  
        // Display saved QR code
        codeDiv.innerHTML = `
          <h3>${code.ssid}</h3>
          <div class="qr-code">${code.qrCode}</div>
          <p>Saved: ${new Date(code.timestamp).toLocaleString()}</p>
        `;
  
        // Add Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
          deleteCode(index);
        });
  
        codeDiv.appendChild(deleteButton);
        container.appendChild(codeDiv);
      });
    }
  
    // Function to delete saved QR code
    function deleteCode(index) {
      const savedCodes = JSON.parse(localStorage.getItem('wifiQRCodes') || '[]');
      savedCodes.splice(index, 1);
      localStorage.setItem('wifiQRCodes', JSON.stringify(savedCodes));
      location.reload(); // Refresh to show updated list
    }
  });
  