import { createRouter } from "next-connect";
import { logIn } from "@/controllers/user-controller";
import { connectToDatabase } from "@/config/db";
import { NextApiResponse,NextApiRequest } from "next";

const router=createRouter<NextApiRequest,NextApiResponse>();
connectToDatabase();
router.post(logIn);
export default router.handler();