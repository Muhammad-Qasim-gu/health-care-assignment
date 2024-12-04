import { createRouter } from "next-connect";
import { connectToDatabase } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getCheckup } from "@/controllers/checkup-controller";

const router = createRouter<NextApiRequest, NextApiResponse>();
connectToDatabase();
router.get(getCheckup)
export default router.handler();
