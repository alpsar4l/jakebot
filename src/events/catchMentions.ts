import { Message } from "discord.js";
import prisma from "../lib/prisma";
import getUserFromMention from "../helpers/getUserFromMention";

export default async function catchMentions(message: Message<boolean>) {
  if (message.author.bot)
    return

  const mentions = getUserFromMention(message.content)
  const authorAfkControl = await prisma.afk.findMany({
    where: {
      clientId: message.author.id
    }
  })

  if (authorAfkControl.length !== 0) {
    message.reply(`welcome back <@${message.author.id}>! :wave:`)

    await prisma.afk.deleteMany({
      where: {
        clientId: message.author.id
      }
    })
  }

  for (const mention of mentions) {
    const mentionAfkControl = await prisma.afk.findFirst({
      where: {
        clientId: mention
      }
    })

    if (mentionAfkControl) {
      message.reply(`<@${message.author.id}>, <@${mention}> currently AFK for "**${mentionAfkControl.reason}**".`)
    }
  }
}
