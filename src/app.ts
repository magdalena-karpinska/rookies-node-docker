import express, { Request, Response } from "express";
import lb from "@google-cloud/logging-bunyan";

async function startServer() {
  try {
    const { logger, mw } = await lb.express.middleware({
      logName: "samples_express",
    });

    const app = express();
    const port = 8080;
    app.use(express.json());

    app.use(mw);

    app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Hello from Index1");
      logger.info("Visited index page");
    });

    app.get("/status", (req: Request, res: Response) => {
      res.status(200).send("Hello from Rookies");
    });

    app.post("/payments", (req: Request, res: Response) => {
      const { carId, amount } = req.body;
      console.log(carId);
      console.log(amount);

      logger.info("Payment received:");
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
