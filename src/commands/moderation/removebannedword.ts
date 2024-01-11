import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import prisma from "../../lib/prisma"

export const data = new SlashCommandBuilder()
  .setName("removebannedword")
  .setDescription("Remove banned word.")
    .addStringOption(option =>
      option.setName("value")
        .setDescription("Word")
        .setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction: CommandInteraction) {
  const word = interaction.options.get("value")

  if (interaction.guild && word) {
    const control = await prisma.bannedWords.count({
      where: {
        guildId: interaction.guild.id,
        word: String(word.value)
      }
    })

    if (control !== 0) {
      const deleteWord = await prisma.bannedWords.deleteMany({
        where: {
          guildId: interaction.guild.id,
          word: String(word.value)
        }
      })

      if (deleteWord) {
        return interaction.reply(`Word removed from list. (**${word.value}**)`);
      }
    } else {
      return interaction.reply(`Banned word has not already been recorded! (**${word.value}**)`);
    }
  }

  return interaction.reply(`An error occurred while removing the word.`);
}
