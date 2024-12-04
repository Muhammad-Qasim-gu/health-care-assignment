import { createRouter } from "next-connect";
import { connectToDatabase } from "@/config/db";
import { getMedicine } from "@/controllers/medicine-controller";
import { NextApiRequest, NextApiResponse } from "next";
import Medicine from "@/controllers/medicine-controller";

const router = createRouter<NextApiRequest, NextApiResponse>();
connectToDatabase();
router.get(getMedicine);
router.post(Medicine)
export default router.handler();
