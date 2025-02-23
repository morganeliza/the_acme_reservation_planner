const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.get("/api/customers", async (req, res, next) => {
  try {
    res.send(await db.getCustomers());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/restaurants", async (req, res, next) => {
  try {
    res.send(await db.getRestaurants());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/reservations", async (req, res, next) => {
  try {
    res.send(await getReservations());
  } catch (ex) {
    next(ex);
  }
});

app.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
      await destroyReservation({
        customer_id: req.params.customer_id,
        id: req.params.id,
      });
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  }
);

app.post("/api/customers/:customer_id/reservations", async (req, res, next) => {
  try {
    res.status(201).send(
      await createReservation({
        customer_id: req.params.customer_id,
        restaurant_id: req.body.restaurant_id,
        reservation_date: req.body.reservation_date,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message || err });
});

const init = async () => {
  console.log("connecting to database");
  app.listen(3000, () => console.log("listening on port 3000"));
  await db.init();
};

init();
