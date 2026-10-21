const { STATUS_CODES } = require("node:http");

class server {
    constructor() {
        this.express = require("express");
        this.app = this.express();
        this.PORT = process.env.PORT || 3000;
        this.products = require("./products.json");

        this.app.use(this.express.static("Public"));
        this.serverGetHealth();
        this.serverGetProducts();
        this.serverListen();

    }
    serverListen() {
        this.app.listen(this.PORT, () => {
            console.log(`shop server running at http://localhost:${this.PORT}`);
            console.log("idk man");
        });
    }
    serverGetHealth() {
        this.app.get("/api/health", (req, res) => {
            res.json({ Status: "ok" });
        });
    }
    serverGetProducts() {
        this.app.get("/api/products", (req, res) => {
            res.json(this.products);
        });
    }
}

new server();

