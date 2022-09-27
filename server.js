let express = require("express");
const bodyParser = require("body-parser");
const app = express();
let tasks = [];
let requestCount = { Get: 0, Post: 0, Delete: 0 };
app.use(bodyParser.json());
app.use("/", express.static("public"));

app.get("/products", function (req, res) {
  console.log("> products GET: received request");
  console.log("Products Array", tasks);
  requestCount.Get += 1;
  console.log(
    `Processed Request Count--> Get:${requestCount.Get}, Post:${requestCount.Post}, Delete:${requestCount.Delete}`
  );
  console.log("< products GET: sending response");
  res.send({ products: tasks });
});

app.post("/products", function (req, res) {
  tasks.push(req.body);
  console.log("> products POST: received request");
  console.log("Product Added", req.body);
  requestCount.Post += 1;
  console.log(
    `Processed Request Count--> Get:${requestCount.Get}, Post:${requestCount.Post}, Delete:${requestCount.Delete}`
  );
  console.log("< products POST: sending response");
  res.send({ code: "Success", message: "Product Added to the List " });
  res.end();
});

app.delete("/products", function (req, res) {
  console.log("> products DELETE: received request");
  tasks = [];
  requestCount.Delete += 1;
  console.log(
    `Processed Request Count--> Get:${requestCount.Get}, Post:${requestCount.Post}, Delete:${requestCount.Delete}`
  );
  console.log("> products DELETE: sending response");
  res.send({
    products: tasks,
    code: "Success",
    message: "All the products have been removed from the List ",
  });
  res.end();
});

app.listen(3009, function () {
  console.log("Hey there! , Welcome to the site");
  console.log("Server is listening at 3009");
  console.log("Endpoints: http://localhost:3009/products method: GET, POST");
});
