class server {
    constructor() {
        this.express = require("express");
        this.app = this.express();
        this.PORT = process.env.PORT || 3000;

        this.serverGet();
        this.serverListen();
    }
    serverGet() {
        this.app.get("/", (req, res) => {
            res.send("Hello from my shop");
        });
    }
    serverListen() {
        this.app.listen(this.PORT, () => {
            console.log(`shop server running at http://localhost:${this.PORT}`);
        });
    }
}

new server();

