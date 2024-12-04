import { createRouter } from "next-connect";
import { NextApiRequest,NextApiResponse } from "next";
import { connectToDatabase } from "@/config/db";
import {deleteCheckup} from "@/controllers/checkup-controller";


const router =createRouter<NextApiRequest,NextApiResponse>();
connectToDatabase()
router.delete(deleteCheckup)
export default router.handler();