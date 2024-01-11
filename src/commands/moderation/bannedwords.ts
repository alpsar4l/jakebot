import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import prisma from "../../lib/prisma"

export const data = new SlashCommandBuilder()
  .setName("bannedwords")
  .setDescription("List banned words.")
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction: CommandInteraction) {
  if (interaction.guild) {
    const bannedWords = await prisma.bannedWords.findMany({
      where: {
        guildId: interaction.guild.id
      }
    })

    return interaction.reply({
      embeds: [{
        color: 0xFF0000,
        title: "words",
        description: bannedWords.map((word) => word.word).join(", "),
        fields: [
          {
            name: "add new",
            value: "/addbannedword <value>",
            inline: true
          },
          {
            name: "remove key",
            value: "/removebannedword <value>",
            inline: true
          }
        ]
      }],
      ephemeral: true
    })
  }

  return interaction.reply(`An error occurred while listing banned words.`);
}
