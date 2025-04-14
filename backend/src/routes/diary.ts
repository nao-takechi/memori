import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router: Router = Router();

router.post("/", async (req, res) => {
  const { diary } = req.body;
  if (!diary) return res.status(400).json({ error: "text is required" });

  const result = await prisma.diary.create({
    data: { diary: diary },
  });

  res.json(result);
});

export default router;
