import express from "express";
import cors from "cors";
import diaryRouter from "./routes/diary";
import { setupSwagger } from "./swagger";

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);

app.use("/api/diaries", diaryRouter);

app.listen(3000, () => {
  console.log("🚀 Dev Server running on http://localhost:3000");
});
