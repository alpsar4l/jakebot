import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import prisma from "../../lib/prisma";
import { hexToDecimal } from "../../lib/colors";
import randomColor from "randomcolor";

export const data = new SlashCommandBuilder()
  .setName("afkset")
  .setDescription("Notify people who try to reach you that you are AFK.")
    .addStringOption(option =>
      option.setName("message")
      .setDescription("AFK message")
      .setRequired(false))

export async function execute(interaction: CommandInteraction) {
  const params = interaction.options.get("message")
  const message = params?.value

  if (interaction.member) {
    await prisma.afk.deleteMany({
      where: {
        clientId: interaction.member.user.id
      }
    })

    await prisma.afk.create({
      data: {
        clientId: interaction.member.user.id,
        reason: String(message),
        createdAt: new Date()
      }
    })

    return interaction.reply({
      embeds: [
        {
          color: hexToDecimal(randomColor()),
          title: "afk",
          description: "i set your status to afk on all the servers I'm on. When you are tagged, i will notify the other party that you have left the keyboard.",
          fields: [
            {
              name: "reason",
              value: message === undefined ? "_unset_" : String(message)
            }
          ]
        }
      ],
      ephemeral: true
    })
  }
}
