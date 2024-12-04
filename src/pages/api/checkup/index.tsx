import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/config/db";
import { checkup } from "@/controllers/checkup-controller";

const router = createRouter<NextApiRequest, NextApiResponse>();
connectToDatabase();
router.post(checkup);
export default router.handler();
