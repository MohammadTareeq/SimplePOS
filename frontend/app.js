// Globals
let codeReaderMain = null;
let codeReaderAdd = null;

const barcodeInput = document.getElementById("barcodeInput");
const productDisplay = document.getElementById("productDisplay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const printBtn = document.getElementById("printBtn");

const startMainScannerBtn = document.getElementById("startMainScannerBtn");
const stopMainScannerBtn = document.getElementById("stopMainScannerBtn");
const scannerContainer = document.getElementById("scanner-container");

const startAddScannerBtn = document.getElementById("startAddScannerBtn");
const stopAddScannerBtn = document.getElementById("stopAddScannerBtn");
const addProductScannerContainer = document.getElementById("add-product-scanner");

const addProductForm = document.getElementById("addProductForm");
const newBarcodeInput = document.getElementById("newBarcode");

let cart = [];

// Utility: Supported barcode formats
const formats = [
  ZXing.BarcodeFormat.CODE_128,
  ZXing.BarcodeFormat.EAN_13,
  ZXing.BarcodeFormat.EAN_8,
  ZXing.BarcodeFormat.UPC_A,
  ZXing.BarcodeFormat.UPC_E,
  ZXing.BarcodeFormat.QR_CODE,
  ZXing.BarcodeFormat.CODE_39,
  ZXing.BarcodeFormat.CODE_93,
  ZXing.BarcodeFormat.ITF,
  ZXing.BarcodeFormat.CODABAR
];

const hints = new Map();
hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);

// Function to start scanner on given container
function startScanner(container, onDetectedCallback) {
  container.innerHTML = "";
  container.style.display = "block";

  const videoId = container.id + "-video";
  const video = document.createElement("video");
  video.setAttribute("id", videoId);
  video.setAttribute("autoplay", true);
  video.setAttribute("muted", true);
  video.setAttribute("playsinline", true);
  video.style.width = "100%";
  video.style.height = "100%";
  container.appendChild(video);

  const codeReader = new ZXing.BrowserMultiFormatReader(hints);

  codeReader.listVideoInputDevices()
    .then(videoInputDevices => {
      if (videoInputDevices.length === 0) {
        alert("No video input devices found");
        return;
      }
      // Choose rear camera if available
      let selectedDeviceId = videoInputDevices[0].deviceId;
      for (const device of videoInputDevices) {
        if (device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('rear')) {
          selectedDeviceId = device.deviceId;
          break;
        }
      }

      codeReader.decodeFromVideoDevice(selectedDeviceId, videoId, (result, err) => {
        if (result) {
          console.log("Detected code:", result.getText());
          onDetectedCallback(result.getText());

          // Stop scanning after detection
          codeReader.reset();
          container.innerHTML = "";
          container.style.display = "none";
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
          console.error(err);
        }
      });
    })
    .catch(err => {
      console.error("Camera initialization error:", err);
      alert("Error accessing camera: " + err);
    });

  return codeReader;
}

// Stop scanner
function stopScanner(codeReader, container) {
  if (codeReader) {
    codeReader.reset();
  }
  container.innerHTML = "";
  container.style.display = "none";
}

// Lookup product API
async function lookupProduct(barcode) {
  if (!barcode) return;
  try {
    const res = await fetch(`/api/products/barcode/${barcode}`);
    if (res.ok) {
      const product = await res.json();
      showProduct(product);
      addToCart(product);
    } else {
      productDisplay.textContent = "Product not found.";
    }
  } catch (error) {
    productDisplay.textContent = "Error fetching product.";
    console.error(error);
  }
}

// Show product details
function showProduct(product) {
  productDisplay.textContent = `${product.name} - ₹${product.price.toFixed(2)}`;
}

// Add product to cart
function addToCart(product) {
  const existing = cart.find(item => item.barcode === product.barcode);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

// Render cart items and total
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.textContent = `${item.name} x${item.qty} = ₹${(item.price * item.qty).toFixed(2)}`;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Print receipt
printBtn.addEventListener("click", () => {
  let receipt = "Receipt\n\n";
  cart.forEach(item => {
    receipt += `${item.name} x${item.qty} = ₹${(item.price * item.qty).toFixed(2)}\n`;
  });
  receipt += `\nTotal: ₹${cart.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2)}`;
  const printWindow = window.open("", "Print Receipt");
  printWindow.document.write(`<pre>${receipt}</pre>`);
  printWindow.document.close();
  printWindow.print();
});

// Main Scanner start/stop
startMainScannerBtn.addEventListener("click", () => {
  if (codeReaderMain) {
    codeReaderMain.reset();
  }
  codeReaderMain = startScanner(scannerContainer, (code) => {
    barcodeInput.value = code;
    lookupProduct(code);
    stopMainScannerBtn.click();
  });
  startMainScannerBtn.disabled = true;
  stopMainScannerBtn.disabled = false;

  // Hide add scanner UI if open
  stopAddScannerBtn.click();
});

stopMainScannerBtn.addEventListener("click", () => {
  stopScanner(codeReaderMain, scannerContainer);
  startMainScannerBtn.disabled = false;
  stopMainScannerBtn.disabled = true;
});

// Manual barcode input on Enter key
barcodeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const code = barcodeInput.value.trim();
    lookupProduct(code);
    barcodeInput.value = "";
  }
});

// Add product scanner start/stop
startAddScannerBtn.addEventListener("click", () => {
  if (codeReaderAdd) {
    codeReaderAdd.reset();
  }
  codeReaderAdd = startScanner(addProductScannerContainer, (code) => {
    newBarcodeInput.value = code;
    stopAddScannerBtn.click();
  });
  startAddScannerBtn.disabled = true;
  stopAddScannerBtn.disabled = false;

  // Hide main scanner UI if open
  stopMainScannerBtn.click();
});

stopAddScannerBtn.addEventListener("click", () => {
  stopScanner(codeReaderAdd, addProductScannerContainer);
  startAddScannerBtn.disabled = false;
  stopAddScannerBtn.disabled = true;
});

// Add product form submission
addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("newName").value.trim();
  const barcode = newBarcodeInput.value.trim();
  const price = parseFloat(document.getElementById("newPrice").value);

  if (!name || !barcode || !price) {
    alert("Please fill in all product details");
    return;
  }

  try {
    const res = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, barcode, price }),
    });

    if (res.ok) {
      alert("Product added successfully!");
      addProductForm.reset();
      newBarcodeInput.value = "";
    } else {
      const data = await res.json();
      alert("Error: " + (data.error || "Could not add product"));
    }
  } catch (error) {
    alert("Server error while adding product");
    console.error(error);
  }
});
