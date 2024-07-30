import express, { Request, Response } from "express";
import { z } from "zod";
import lb from "@google-cloud/logging-bunyan";

const PayloadSchema = z.object({
  carId: z.string().uuid(),
  amount: z.number().int(),
});

type PaymentPayload = {
  carId: string;
  amount: number;
};

async function startServer() {
  const { logger, mw } = await lb.express.middleware({
    logName: "samples_express",
  });

  const app = express();
  const port = 8080;
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Index").status(200);
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
    res.status(200).json("Payment success");
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
