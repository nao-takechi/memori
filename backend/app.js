import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// Expressアプリのセットアップ
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// LINEのチャネルアクセストークン
const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;

// Webhookのエンドポイントの設定
app.use(bodyParser.json());

// Webhookエンドポイント
app.post("/callback", async (req, res) => {
  const events = req.body.events;

  // イベントが存在する場合
  if (events && events.length > 0) {
    for (const event of events) {
      // メッセージイベントの場合
      if (event.type === "message" && event.message.type === "text") {
        const userMessage = event.message.text; // 受け取ったメッセージ
        const userId = event.source.userId; // ユーザーID
        const replyToken = event.replyToken; // 返信トークン

        // ユーザーの確認と登録
        await createUser(userId);
        // 日記の登録
        await createDiary(userId, userMessage);

        // ユーザーに返信する
        sendReply(replyToken, `あなたが送信したメッセージ: ${userMessage}`);
      }
    }
  }

  // LINEに200 OKを返す
  res.status(200).send("OK");
});

// ユーザーが存在しない場合に新たに登録する関数
const createUser = async (userId) => {
  // DB にユーザーが存在するか確認
  const user = await prisma.user.findUnique({
    where: {
      UID: userId, // UID が userId であるユーザーを探す
    },
  });

  // ユーザーが DB に存在しない場合、新しく登録
  if (!user) {
    await prisma.user.create({
      data: {
        UID: userId, // 新しいユーザーとして userId を登録
      },
    });
  }
};

// 日記を新規登録
const createDiary = async (userId, message) => {
  const user = await prisma.user.findUnique({
    where: {
      UID: userId, // UID が userId であるユーザーを探す
    },
  });

  await prisma.diary.create({
    data: {
      userId: user.id,
      message: message,
    },
  });
};

// 返信をLINEに送信する関数
const sendReply = (replyToken, message) => {
  const url = "https://api.line.me/v2/bot/message/reply";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
  };

  const body = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  };

  // LINE APIにリクエストを送信
  axios.post(url, body, { headers }).catch((error) => {
    console.error("Error sending message:", error);
  });
};

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
