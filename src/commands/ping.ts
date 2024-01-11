import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");

export async function execute(interaction: CommandInteraction) {
  const ms = Date.now() - interaction.createdTimestamp
  return interaction.reply(`🏓 Latency is ${ms}ms!`);
}
