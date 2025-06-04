🛍️ Simple POS System with Barcode Scanning
This is a simple web-based Point of Sale (POS) system designed for quickly adding products to a cart using barcode scanning or manual input, displaying product details, calculating the total, and printing a receipt. It also includes functionality to add new products to the system.

Features
Barcode Scanning (Main Sale): Quickly scan product barcodes to add them to the sales cart.

Manual Barcode Input: Enter barcodes manually if a scanner is not available or for specific lookups.

Product Display: Shows the name and price of the last scanned/entered product.

Shopping Cart Management:
Adds products to the cart.
Increments quantity if a product is scanned multiple times.
Displays all items in the cart with their quantities and individual totals.
Calculates and displays the grand total of the cart.
Print Receipt: Generates a printable receipt of the current transaction.

Add New Products:
Dedicated interface to add new products to the system.
Supports barcode scanning for the new product's barcode.
Requires product name, barcode, and price.
Camera Selection: Prioritizes the back/rear camera for barcode scanning for better usability on mobile devices.
Data Persistence: Product data is stored in a MongoDB database.

Technologies Used
Frontend:
HTML5: For the structure of the POS interface.
CSS3: For styling, providing a clean and intuitive user interface. (Note: Some styles are also embedded in index.html).
JavaScript (app.js): Manages all client-side logic, including:
Interacting with the DOM.
Handling user input and button clicks.
Making API calls to the backend.
Managing the shopping cart state.
Implementing barcode scanning using ZXing-JS.
ZXing-JS: A JavaScript library for multi-format 1D/2D barcode reading.

Backend:
Node.js: JavaScript runtime environment.
Express.js: Web framework for building the RESTful API endpoints.
Mongoose: MongoDB object modeling tool, used for interacting with the database.
cors: Middleware for enabling Cross-Origin Resource Sharing.
MongoDB: A NoSQL database used for persistent storage of product information.
Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)
npm (comes with Node.js)
MongoDB installed and running locally, or access to a MongoDB Atlas instance.
Installation
Clone the repository:

Bash

git clone <repository_url>
cd simple-pos-system
(Replace <repository_url> with the actual URL of your GitHub repository.)

Install backend dependencies:
Navigate to the root directory where your server.js and package.json are located (e.g., simple-pos-system/ if server.js is at the root, or simple-pos-system/backend/ if your frontend is in a frontend/ directory).

Bash

npm install
This will install express, mongoose, and cors as specified in package.json.

Running the Application
Ensure MongoDB is running:
Make sure your local MongoDB instance is running, or that your mongoUri in server.js points to a valid, accessible MongoDB database. The default URI is mongodb://localhost:27017/pos.

Start the backend server:
Open your terminal or command prompt, navigate to the directory containing server.js, and run:

Bash

npm start or node server.js
You should see messages indicating a successful MongoDB connection and that the server is running (e.g., "✅ MongoDB connected" and "Server running on http://localhost:5000").

Open the frontend in your browser:
Open your web browser and navigate to http://localhost:5000 (or whatever port your server is running on). The server.js is configured to serve static files from a frontend directory.

Project Structure

server.js: The main backend Express.js server, responsible for connecting to MongoDB, setting up middleware, and routing API requests.

routes/productRoutes.js: Defines the API routes for handling product-related operations (adding and looking up products).

models/Product.js: Defines the Mongoose schema and model for products, including name, barcode, and price fields.

public/ (or frontend/ if structured as backend/frontend): This directory contains the static client-side files.

index.html: The main HTML page for the POS interface.

app.js: The primary client-side JavaScript file containing the POS logic, barcode scanning, and API interactions.

style.css: Contains the CSS for the application's styling.

(You'll need to include the ZXing-JS library in your index.html via a CDN or local file for barcode scanning to work.)

package.json: Defines project metadata and backend dependencies.

package-lock.json: Records the exact dependency tree.

Frontend (app.js) Details

The app.js file orchestrates the user interface and interactions:


Global Variables: Manages codeReaderMain, codeReaderAdd for scanner instances, and references to various DOM elements like barcodeInput, productDisplay, cartItems, cartTotal, printBtn, scanner containers, and add product form elements.

Barcode Formats: Defines an array of supported barcode formats for the ZXing library (e.g., CODE_128, EAN_13, QR_CODE).

startScanner(container, onDetectedCallback): A reusable function to initialize and start a barcode scanner within a specified HTML container. 
It prioritizes the rear camera and calls a callback function with the detected code upon successful scanning.

stopScanner(codeReader, container): Stops the given barcode reader and hides its container.

lookupProduct(barcode): Sends a GET request to /api/products/barcode/:barcode to fetch product details and then calls showProduct() and addToCart().

showProduct(product): Updates the productDisplay area with the fetched product's name and price.

addToCart(product): Adds a product to the cart array, managing quantities if the product already exists, and then calls renderCart().

renderCart(): Clears and repopulates the cartItems display, and updates the cartTotal.

Event Listeners: Handles interactions for:

Starting/stopping the main scanner.

Manual barcode input via the Enter key.

Starting/stopping the add product scanner.

Printing the receipt.

Submitting the "add product" form, sending a POST request to /api/products/add.

Backend API Endpoints

The backend handles product management through the following endpoints:

POST /api/products/add: Adds a new product to the MongoDB database.

Request Body: Expects JSON with name (String), barcode (String, must be unique), and price (Number).

Responses:

201 Created: If the product is successfully added.

400 Bad Request: If required fields are missing or a product with the same barcode already exists.

500 Server Error: For internal server errors.

GET /api/products/barcode/:code: Retrieves a product from the database by its barcode.

URL Parameter: :code (the barcode to look up).

Responses:

200 OK: If the product is found, returns the product object.

404 Not Found: If no product matches the barcode.

500 Server Error: For internal server errors.

Customization and Extension

Styling: Modify style.css (and/or the embedded styles in index.html) to customize the visual appearance.

Advanced Features:

Product quantity adjustment in the cart.


Removing items from the cart.

Editing existing product details.

Sales history and reporting.

User authentication.

More sophisticated receipt generation (e.g., dynamic content, company logo).

Implementing a search feature for products by name.

Adding categories to products.
