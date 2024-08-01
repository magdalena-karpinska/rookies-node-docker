import express, { Request, Response } from "express";
import { logger } from "./logger";
import { postOutBox, postPayments } from "../server/queries";
import { db } from "../server/db";
import { log } from "winston";
import { outBoxTable, payments } from "../server/db/schema";

const app = express();
const port = 8080;
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello from Index1");

  logger.info("Index page!");
});

app.get("/status", (_req: Request, res: Response) => {
  res.status(200).send("Hello from Rookies");

  logger.info("Status page!");
});

app.post("/payments", async (req: Request, res: Response) => {
  const { car_id, amount } = req.body;
  console.log(car_id);
  console.log(amount);

  // if (typeof amount !== "number" || !Number.isInteger(amount)) {
  //   logger.log({
  //     message: "Invalid amount. It must be an integer.",
  //     level: "error",
  //   });
  //   return res
  //     .status(400)
  //     .json({ error: "Invalid amount. It must be an integer." });
  // }

  // try {
  //   await db.transaction(async (tx) => {
  //     // await postPayments(tx, car_id, amount);
  //     await tx
  //       .insert(payments)
  //       .values({ car_id: car_id, amount: amount })
  //       .returning();
  //     console.log("run postPayments");
  //     // await postOutBox(tx, car_id);
  //     await tx.insert(outBoxTable).values({ car_id: car_id }).returning();
  //     console.log("run postOutBox");
  //   });
  // } catch (error) {
  //   console.error("Transaction failed:", error);
  //   logger.error({
  //     message: "Transaction failed",
  //     error: error instanceof Error ? error.message : String(error),
  //   });
  //   return res.status(500).json({ error: "Transaction failed" });
  // }
  try {
    await db
      .insert(payments)
      .values({ car_id: car_id, amount: amount })
      .returning();
  } catch (error) {
    console.error("Failed data insert:", error);
    logger.error({
      message: "Transaction failed",
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error("Failed data insert");
    // return res.status(500).json({ error: "Transaction failed" });
  }

  res.status(200).send("Payment success");
  logger.info({
    level: "info",
    message: "Payment processed successfully",
    car_id,
    amount,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
