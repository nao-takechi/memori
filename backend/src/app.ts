import express from "express";
import cors from "cors";
import diaryRouter from "./routes/diary";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diary", diaryRouter);

app.listen(3000, () => {
  console.log("🚀 Dev Server running on http://localhost:3000");
});
