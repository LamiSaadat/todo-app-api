const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

const routes = require("./routes");

app.use(cors());
app.use(express.json());

app.use("/todos", routes);

app.listen(PORT, () => {
  console.log(`Listening on post ${PORT}`);
});
