class callServer {
    constructor() {
        this.useLocalFile = false;
        this.productList = document.querySelector("#products");
    }
    async callServerProducts() {
        const address = this.useLocalFile//if useLocalFile = false, then it will use :, if its true it will use ?
            ? "products.json"
            : "/api/products";
        const response = await fetch(address);
        //fetch gets the information from the server and as the server sends ends headers (like status 200 OK)
        //await makes the program wait for the process to finish and get the data out before moving on to the next line
        if (!response.ok) {//if the server doesnt send 200 (ok) it will show an error
            throw new Error(`Failed to fetch products, Server didnt respond ${response.status}`);
        }
        return await response.json();
        //await makes the program wait for the process to finish before moving on to the next line
        /** 
         * return await response.json(); has to:
         * Wait for all the data to finish downloading from the server (await)
         * Read the raw text and parse it from a JSON string into real JavaScript objects and arrays (.json())
        */
    }
    showServerProducts(products) {
        this.productList.textContent = "";
        if (products.length == 0) {
            this.productList.textContent = "No products Found, or no product list exists";
            return;
        }

        /**
         * for (let i = 0; i < repos.length; i++) {
         *      const repo = repos[i];
         * }
        */

        //code below (for (const holdOneRepo of repos)) is a cleaner version of the commented code above ^^^

        for (const holdOneProduct of products) { //Go through the list called repos
            //and for each item in that list, call it holdOneRepo and run the code inside the curly brackets { }
            const itemInProducts = document.createElement("li"); //creats a list item (<li></li>)

            itemInProducts.textContent = `${holdOneProduct.name} \n£${holdOneProduct.price} \n|${holdOneProduct.stock} in stock|`;
            itemInProducts.style.whiteSpace = "pre-line";
            this.productList.append(itemInProducts);

        }
    }
    async runWebsite() {//used to run 
        try {
            const products = await this.callServerProducts(); //await makes the program wait for the process to finish before moving on to the next line
            //since sending a request over the internet can take time, if we didnt use await, JS would jst rush to the next line without checking if it got the data
            //Without await it would output: Promise { <pending> }  <-- You get a "receipt/promise", not the data
            //with await it would output: [{ name: "my-repo", ... }] <-- The actual finished data
            //so its always good practice to use await when trying to get data from the internet
            this.showServerProducts(products);
        } catch (error) {
            console.error(error);
            this.productList.textContent = `server has been found and loaded but no products could be found on the list or the list has no products`
        }

    }
}

const browser = new callServer();
browser.runWebsite();