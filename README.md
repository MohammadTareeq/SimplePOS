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
Persistence: (Assumes backend handles persistence, e.g., to a products.json file).
Technologies Used
Frontend:
HTML5: For the structure of the POS interface.
CSS3: For styling, providing a clean and intuitive user interface.
JavaScript (app.js): Manages all client-side logic, including:
Interacting with the DOM.
Handling user input and button clicks.
Making API calls to the backend.
Managing the shopping cart state.
Implementing barcode scanning using ZXing.
ZXing-JS: A JavaScript library for multi-format 1D/2D barcode reading.
Backend (Node.js/Express.js): (Based on typical POS backend structure, though server.js and productRoutes.js were not fully detailed, the app.js interactions imply them)
Node.js: JavaScript runtime environment.
Express.js: Web framework for building the RESTful API endpoints.
body-parser: Middleware for parsing incoming request bodies.
cors: Middleware for enabling Cross-Origin Resource Sharing.
File System (fs): (Likely used for persistent storage of products, e.g., in a products.json file).
Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)
npm (comes with Node.js)
Installation
Clone the repository:

Bash

git clone <repository_url>
cd simple-pos-system
(Replace <repository_url> with the actual URL of your GitHub repository.)

Install backend dependencies:
Navigate to the root directory where your server.js (and package.json if you have one for backend dependencies) resides and run:

Bash

npm install
(This assumes you have a package.json file in your server directory with express, body-parser, and cors listed as dependencies.)

Running the Application
Start the backend server:
Open your terminal or command prompt, navigate to the directory containing server.js, and run:

Bash

node server.js
You should see a message indicating the server is running (e.g., "Server is running on port 3000").

Open the frontend in your browser:
Open your web browser and navigate to http://localhost:3000 (or whatever port your server is running on).

Project Structure
server.js: The main backend Express.js server responsible for setting up the API and serving static files.
productRoutes.js: (Assumed) Handles product-related API endpoints (lookup, add, etc.).
product.js: (Assumed) Represents the product data model or utility functions.
public/ (or similar directory for static files):
index.html: The main HTML page for the POS interface.
app.js: The primary client-side JavaScript file containing the POS logic, barcode scanning, and API interactions.
style.css: Contains the CSS for the application's styling.
node_modules/zxing-js/: (Or a CDN link to ZXing-JS) The barcode scanning library.
products.json: (Assumed) A file used by the backend to store product data persistently.
package.json: Defines project metadata and dependencies.
package-lock.json: Records the exact dependency tree.
Frontend (app.js) Details
The app.js file orchestrates the user interface and interactions:

Global Variables: Manages codeReaderMain, codeReaderAdd for scanner instances, and references to various DOM elements.
Barcode Formats: Defines an array of supported barcode formats for the ZXing library.
startScanner(container, onDetectedCallback): A reusable function to initialize and start a barcode scanner within a specified HTML container. It selects the rear camera if available and calls a callback function upon barcode detection.
stopScanner(codeReader, container): Stops the given barcode reader and clears the scanner container.
lookupProduct(barcode): Fetches product details from the backend using the provided barcode and displays them.
showProduct(product): Updates the product display area with the fetched product's name and price.
addToCart(product): Adds a product to the cart array, managing quantities if the product already exists, and then calls renderCart().
renderCart(): Clears and repopulates the cart display, and updates the total.
Event Listeners: Handles interactions for:
Starting/stopping the main scanner.
Manual barcode input (Enter key).
Starting/stopping the add product scanner.
Printing the receipt.
Submitting the "add product" form.
API Endpoints (Assumed from app.js interactions)
GET /api/products/barcode/:barcode: Looks up a product by its barcode.
POST /api/products/add: Adds a new product to the system. Expects a JSON body with name, barcode, and price.
Customization and Extension
Styling: Modify style.css to customize the visual appearance.
Backend Storage: Currently, product data is likely stored in a products.json file. For a more robust solution, integrate with a database (e.g., MongoDB, PostgreSQL, SQLite).
Advanced Features:
Product quantity adjustment in the cart.
Removing items from the cart.
Editing existing product details.
Sales history and reporting.
User authentication.
More sophisticated receipt generation.
