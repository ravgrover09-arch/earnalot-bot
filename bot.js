import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";
import cron from "node-cron";
import { exec } from "child_process";

const BOT_TOKEN = "8606024623:AAFZYcMcMMwr5vkg9z5_3FfPwQYEENjMJSg";
const CHAT_ID = "-1003821449973";
const BUTTON_URL = "https://t.me/Earn_Alot_Bot";
const IMAGE_PATH = path.resolve("./Lottery.jpg");

async function sendPhoto(caption) {
  try {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("caption", caption);
    formData.append("photo", fs.createReadStream(IMAGE_PATH));
    formData.append(
      "reply_markup",
      JSON.stringify({
        inline_keyboard: [[{ text: "🎟️ Buy Ticket Now", url: BUTTON_URL }]],
      })
    );
    const res = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
      formData,
      { headers: formData.getHeaders() }
    );
    if (res.data.ok) console.log("✅ SENT:", caption);
    else console.log("❌ ERROR:", res.data);
  } catch (err) {
    console.error("❌ ERROR SENDING PHOTO:", err.message);
  }
}

// Restart before each message to avoid hiccups
cron.schedule("35 5 * * *", () => {
  console.log("🔄 Restarting before 5:38 AM message...");
  exec("pm2 restart earnalot-bot");
}, { timezone: "Asia/Kolkata" });

cron.schedule("30 8 * * *", () => {
  console.log("🔄 Restarting before 8:33 AM message...");
  exec("pm2 restart earnalot-bot");
}, { timezone: "Asia/Kolkata" });

// Scheduled messages
cron.schedule("38 5 * * *", () => {
  console.log("⏰ 5:38 AM CRON - Ending Soon");
  sendPhoto("⏰ Hurry! Lottery ending soon!");
}, { timezone: "Asia/Kolkata" });

cron.schedule("33 8 * * *", () => {
  console.log("🎉 8:33 AM CRON - Lottery Live");
  sendPhoto("🎉 Lottery is LIVE now! Get your tickets!");
}, { timezone: "Asia/Kolkata" });

console.log("🚀 Bot running with scheduled notifications...");