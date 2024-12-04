import { createRouter } from "next-connect";
import { connectToDatabase } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import {  GetDisease } from "@/controllers/disease-controller";

const router = createRouter<NextApiRequest, NextApiResponse>();
connectToDatabase();
router.get(GetDisease);
export default router.handler();
