import { createRouter } from "next-connect";
import { connectToDatabase } from "@/config/db";
import { signUp } from "@/controllers/user-controller";
import { NextApiRequest,NextApiResponse } from "next";


const router=createRouter<NextApiRequest,NextApiResponse>();
connectToDatabase();
router.post(signUp);
export default router.handler()