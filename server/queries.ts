import { db } from "./db";
import { outBoxTable, payments } from "./db/schema";

export const postPayments = async (tx: any, carId: string, amount: number) => {
  await tx.insert(payments).values({ carId: carId, amount: amount });
};

export const postOutBox = async (tx: any, carId: string) => {
  await tx.insert(outBoxTable).values({ carId: carId });
};
