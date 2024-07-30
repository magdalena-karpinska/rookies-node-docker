import express, { Request, Response } from "express";
import lb from "@google-cloud/logging-bunyan";

type PaymentPayload = {
  carId: string;
  amount: number;
};

async function startServer() {
  try {
    const { logger, mw } = await lb.express.middleware({
      logName: "samples_express",
    });

    const app = express();
    const port = 8080;
    app.use(express.json());

    // Use the Bunyan middleware
    app.use(mw);

    app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Hello from Index");
      logger.info("Visited index page");
    });

    app.get("/status", (req: Request, res: Response) => {
      res.status(200).send("Hello from Rookies");
    });

    app.post("/payments", (req: Request, res: Response) => {
      const { carId, amount } = req.body as PaymentPayload;

      logger.info(`Payment received: carId=${carId}, amount=${amount}`);
      res.status(200).json("Payment success");
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
      logger.info(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error initializing server:", error);
  }
}

startServer();
