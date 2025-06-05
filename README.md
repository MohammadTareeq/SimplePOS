# **🛍️ Simple POS System with Barcode Scanning**

## **Project Description**

This is a simple web-based Point of Sale (POS) system designed for quickly adding products to a cart using barcode scanning or manual input, displaying product details, calculating the total, and printing a receipt. It also includes functionality to add new products to the system.

## **Features**

* **Barcode Scanning (Main Sale):** Quickly scan product barcodes to add them to the sales cart.  
* **Manual Barcode Input:** Enter barcodes manually if a scanner is not available or for specific lookups.  
* **Product Display:** Shows the name and price of the last scanned/entered product.  
* **Shopping Cart Management:**  
  * Adds products to the cart,  
  * Increments quantity if scanned multiple times,  
  * Displays all items with quantities and totals,  
  * Calculates the grand total.  
* **Print Receipt:** Generates a printable receipt of the current transaction.  
* **Add New Products:** Dedicated interface to add new products, supports barcode scanning, requires name, barcode, and price.  
* **Camera Selection:** Prioritizes the back/rear camera for barcode scanning on mobile devices.  
* **Data Persistence:** Product data is stored in a MongoDB database.

## **Technologies Used**

* **Frontend:** HTML5, CSS3, JavaScript (app.js), ZXing-JS library  
* **Backend:** Node.js, Express.js, Mongoose, cors, MongoDB

## **Getting Started**

### **Prerequisites**

* Node.js (LTS version recommended)  
* npm (comes with Node.js)  
* MongoDB installed locally or access to MongoDB Atlas

### **Installation**

* Clone the repository and install dependencies by running the appropriate commands in the terminal.

## **Running the Application**

* Ensure MongoDB is running.  
* Start the backend server.  
* Open the frontend in your browser (default: http://localhost:5000).

## **Project Structure**

* `server.js` – Backend Express server  
* `routes/productRoutes.js` – API routes for products  
* `models/Product.js` – Mongoose schema/model for products  
* `public/` or `frontend/` – Static client files  
* `index.html` – Main frontend page  
* `app.js` – Frontend logic and barcode scanning  
* `style.css` – Application styling

## **Backend API Endpoints**

* **POST /api/products/add:** Add a new product  
* **GET /api/products/barcode/:code:** Lookup product by barcode

