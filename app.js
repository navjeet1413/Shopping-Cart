const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);   
mongoose.connect("mongodb+srv://navjeet17:NAVI2002@cluster0.auinkwj.mongodb.net/test")
    .then(()=>{
        console.log("connnection successful")
    })
    .catch((err) => console.log(err))



const CartItem = mongoose.model("CartItem", {
  name: String,
  price: Number,
  quantity: Number
});

app.get("/", (req, res) => {
      const welcome="Welcome to my Cart";
      res.send(welcome);
  });

app.get("/cart", (req, res) => {
  CartItem.find((error, items) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(items);
  });
});


app.post("/cart", (req, res) => {
  const item = new CartItem(req.body);
  item.save((error, item) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(item);
  });
});


app.delete("/cart/:id", (req, res) => {
  CartItem.findByIdAndRemove(req.params.id, (error, item) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(item);
  });
});


app.post("/cart/checkout", (req, res) => {
  
  CartItem.deleteMany({}, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
  
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
