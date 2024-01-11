import { Message } from "discord.js";
import prisma from "../lib/prisma";

async function catchBannedWords(message: Message<boolean>) {
  if (message.author.bot)
    return

  const keys = message.content.toLowerCase().split(" ")
  const words = await prisma.bannedWords.findMany({
    where: {
      guildId: String(message.guildId)
    }
  })

  for (const word of words) {
    if (keys.includes(word.word)) {
      message.delete()
      break;
    }
  }
}

export default catchBannedWords
