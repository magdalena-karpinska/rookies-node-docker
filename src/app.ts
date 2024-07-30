import express, { Request, Response } from "express";

const app = express();
const port = 8000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from Index1");
});

app.get("/status", (req: Request, res: Response) => {
  res.status(200).send("Hello from Rookies");
});

app.post("/payments", (req: Request, res: Response) => {
  const { carId, amount } = req.body;
  console.log(carId);
  console.log(amount);

  res.status(200).json("Payment success");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
