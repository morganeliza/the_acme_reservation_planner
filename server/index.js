const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.get("/api/customers", async (req, res, next) => {

    const result = await db.getCustomers();
    res.send(result);
}


);


app.post("/api/customers", async (req, res, next) => {
  const result = await db.createCustomer(req.body.name);
  res.send(result);
});

const init = async () => {
  app.listen(3000, () => console.log("listening on port 3000"));
  await db.init();
};

init();
