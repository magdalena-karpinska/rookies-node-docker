import Express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const PayloadSchema = z.object({
  carId: z.string().uuid(),
  amount: z.number().int(),
});

type PaymentPayload = {
  carId: string;
  amount: number;
};

const app = Express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from").status(200);
});

app.get("/status", (req: Request, res: Response) => {
  res.send("Hello from Rookies").status(200);
});

app.post("/payments", (req: Request, res: Response) => {
  const result = PayloadSchema.safeParse(req.body);

  const { carId, amount } = result.data as PaymentPayload;

  if (!carId || !amount) {
    res.status(400).send("Invalid request");
  }
  res.status(200).send("Payment success");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
