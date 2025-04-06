import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

// Expressアプリのセットアップ
const app = express();
const port = process.env.PORT || 3000;

// LINEのチャネルアクセストークン
const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;

const db = new sqlite3.Database("./db/database.db", (err) => {
  if (err) {
    console.error("データベース接続エラー:", err.message);
  } else {
    console.log("SQLiteデータベースに接続しました");
  }
});

// Webhookのエンドポイントの設定
app.use(bodyParser.json());

// Webhookエンドポイント
app.post("/callback", (req, res) => {
  const events = req.body.events;

  // イベントが存在する場合
  if (events && events.length > 0) {
    events.forEach((event) => {
      // メッセージイベントの場合
      if (event.type === "message" && event.message.type === "text") {
        const userMessage = event.message.text; // 受け取ったメッセージ
        const userId = event.source.userId; // ユーザーID
        const replyToken = event.replyToken; // 返信トークン

        console.log(`Received message from user ${userId}: ${userMessage}`);

        // ユーザーに返信する
        sendReply(replyToken, `あなたが送信したメッセージ: ${userMessage}`);
      }
    });
  }

  // LINEに200 OKを返す
  res.status(200).send("OK");
});

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
  axios
    .post(url, body, { headers })
    .then((response) => {
      console.log("Message sent:", response.data);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
