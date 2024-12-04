import { createRouter } from "next-connect";
import { connectToDatabase } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Disease } from "@/controllers/disease-controller";

const router = createRouter<NextApiRequest, NextApiResponse>();
connectToDatabase();
router.post(Disease);
export default router.handler();
