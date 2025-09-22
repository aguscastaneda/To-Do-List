const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const taskRouter = require("./routes/task.routes.js");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/tasks", taskRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}...`);
});
