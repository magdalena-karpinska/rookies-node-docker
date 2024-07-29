import Express from "express";

const app = Express();
const port = 8080;

app.get("/status", (req, res) => {
  res.send("Hello from Rookies").status(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
