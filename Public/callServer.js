class callServer {
    constructor() {
        this.useLocalFile = false;
        this.productList = document.querySelector("#products");
    }
    async callServerProducts() { //async is used when a function accesses the internet
        const address = this.useLocalFile//if useLocalFile = false, then it will use :, if its true it will use ?
            ? "products.json"
            : "/api/products";
        const response = await fetch(address);
        //fetch gets the information from the server and as the server sends ends headers (like status 200 OK)
        //await makes the program wait for the process to finish and get the data out before moving on to the next line
        if (!response.ok) {//Error handling (if the server doesnt send 200 (ok) it will show an error)
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
        if (products.length == 0) { //Error handling (if the productsList is empty it will send a log to the console and end the function)
            console.log("Product list is empty");
            return;
        }

        /**
         * for (let i = 0; i < products.length; i++) {
         *      const holdOneProduct = products[i];
         * }
        */

        //code below (for (const holdOneProduct of products)) is a cleaner version of the commented code above ^^^

        for (const holdOneProduct of products) { //Go through the list called products
            //and for each item in that list, call it holdOneProduct and run the code inside the curly brackets { }
            const itemInProducts = document.createElement("li"); //creats a list item inside the HTML (<li></li>)

            //seperates and then adds the name, price and stock of each item found in the products list as a new element inside of the itemInProducts list
            // then uses \n and "itemInProducts.style.whiteSpace = "pre-line";" to create a new line (white space) to make the information easier to read
            itemInProducts.textContent = `${holdOneProduct.name} \n£${holdOneProduct.price} \n|${holdOneProduct.stock} in stock|`;
            itemInProducts.style.whiteSpace = "pre-line";

            //the itemInProducts list is then added to the HTML so it can be displayed to the user
            this.productList.append(itemInProducts);

        }
    }
    async runWebsite() {//used to run callServerProducts function, then passes the data from the callServerProducts function (as products) to the showServerProducts function
        try { //Error handling
            const products = await this.callServerProducts(); //await makes the program wait for the process to finish before moving on to the next line
            //since sending a request over the internet can take time, if we didnt use await, JS would jst rush to the next line without checking if it got the data
            //Without await it would output: Promise { <pending> }  <-- You get a "receipt/promise", not the data
            //with await it would output: [{ name: "my-repo", ... }] <-- The actual finished data
            //so its always good practice to use await when trying to get data from the internet
            this.showServerProducts(products);
        } catch (error) { //if callServerProducts doesnt return any data (the product list is Empty) it will log the error in the console and inform the user 
            console.error(error);
            this.productList.textContent = `server has been found and loaded but the product list is empty`
        }

    }
}

const browser = new callServer();
browser.runWebsite();