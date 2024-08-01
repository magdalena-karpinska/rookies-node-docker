import express, { Request, Response } from "express";
import { logger } from "./logger";
import { postOutBox, postPayments } from "../server/queries";
import { db } from "../server/db";
import { log } from "winston";
import { outBoxTable, payments } from "../server/db/schema";
import { eq } from "drizzle-orm";

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

  if (typeof amount !== "number") {
    logger.log({
      message: "Invalid amount. It must be an integer.",
      level: "error",
    });
    return res
      .status(400)
      .json({ error: "Invalid amount. It must be an integer." });
  }

  if (!car_id.trim()) {
    return res.status(400).json({ error: "Car ID is required" });
  }

  try {
    await db.transaction(async (tx) => {
      await tx
        .insert(payments)
        .values({ car_id: car_id, amount: amount })
        .returning();

      await tx.insert(outBoxTable).values({ car_id: car_id }).returning();
    });

    const response = await fetch(
      "https://rookies-warehouse-ynorbbawua-lz.a.run.app/warehouse",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car_id }),
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Transaction failed" });
    }

    await db.delete(outBoxTable).where(eq(car_id, car_id)).returning();
    console.log("Car object deleted from the outBoxTable");

    res.status(200).send("Payment success");
    logger.info({
      level: "info",
      message: "Payment processed successfully",
      car_id,
      amount,
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    logger.error({
      message: "Transaction failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
