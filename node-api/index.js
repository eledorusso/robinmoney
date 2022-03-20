const express = require("express");
const app = express();
const port = 3000;
const usuariosRouter = require("./routes/usuario");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//GET
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//URL ENLAZADA CON EL ROUTER
app.use("/api/1.0/usuario", usuariosRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//module.exports.getMultiple = getMultiple;