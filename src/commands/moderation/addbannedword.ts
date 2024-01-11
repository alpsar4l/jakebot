import { CommandInteraction, PermissionFlagsBits, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import prisma from "../../lib/prisma"

export const data = new SlashCommandBuilder()
  .setName("addbannedword")
  .setDescription("Filter the word you do not want used in your community.")
    .addStringOption(option =>
      option.setName("value")
        .setDescription("Banned word that you do not want to be used.")
        .setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction: CommandInteraction) {
  const word = interaction.options.get("value")

  if (interaction.guild && word) {
    const control = await prisma.bannedWords.count({
      where: {
        guildId: interaction.guild.id,
        word: String(word.value).toLowerCase()
      }
    })

    if (control === 0) {
      const createWord = await prisma.bannedWords.create({
        data: {
          guildId: interaction.guild.id,
          word: String(word.value)
        }
      })

      if (createWord) {
        return interaction.reply(`Banned word added: **${word.value}**`);
      }
    } else {
      return interaction.reply(`Banned word has already been added (**${word.value}**)`);
    }
  }

  return interaction.reply(`An error occurred while saving the word.`);
}
