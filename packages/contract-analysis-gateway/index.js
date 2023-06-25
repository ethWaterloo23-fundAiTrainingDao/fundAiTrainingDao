import bot from "@xmtp/bot-starter";

import dotenv from "dotenv";
dotenv.config();

// XTMP message handler
bot.default(async (context) => {
  const message = context.message.content;
  console.log(`RECV: ${message}`);

  const response = await fetch(
    `${AI_BACKEND}/?text=${encodeURIComponent(message)}`,
    {
      method: "POST",
    }
  );

  // reply to XMTP message
  const text = await response.text();

  await context.reply(`${text}`);
  console.log(`SENT: ${text}`);
});
