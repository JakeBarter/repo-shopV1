const { STATUS_CODES } = require("node:http"); // Built-in Node HTTP module (optional reference for HTTP status codes)

class server {
    constructor() {
        // Import the Express library to build the web server
        this.express = require("express");

        // Initialize an Express application instance
        this.app = this.express();

        // Define the port: uses process.env.PORT if specified by a host, otherwise defaults to 3000
        this.PORT = process.env.PORT || 3000;

        // Load the product data from products.json into memory
        this.products = require("./products.json");

        // Middleware: Tells Express to serve static files (HTML, CSS, JS) from the "Public" folder
        // When someone visits http://localhost:3000, Express automatically serves Public/index.html
        this.app.use(this.express.static("Public"));

        // Register the API endpoints
        this.serverGetHealth();
        this.serverGetProducts();

        // Start the server listening for requests
        this.serverListen();
    }

    // Starts the server and listens for incoming HTTP requests on the specified port
    serverListen() {
        this.app.listen(this.PORT, () => {
            // Callback function that runs once the server is successfully running
            console.log(`shop server running at http://localhost:${this.PORT}`);
            console.log("idk man");
        });
    }

    // Health check route (GET /api/health)
    // Used to check if the server is online and running properly
    serverGetHealth() {
        this.app.get("/api/health", (req, res) => {
            // Sends back a JSON object with { Status: "ok" }
            res.json({ Status: "ok" });
        });
    }

    // Products route (GET /api/products)
    // Sends the products list to whatever client (browser or fetch call) requested it
    serverGetProducts() {
        this.app.get("/api/products", (req, res) => {
            // Converts this.products into JSON and sends it in the response
            res.json(this.products);
        });
    }
}

// Create an instance of the server class to run the constructor and start everything up
new server();
