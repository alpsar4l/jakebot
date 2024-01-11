import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import randomColor from "randomcolor";
import { hexToDecimal, hex2rgb } from "../../lib/colors";

export const data = new SlashCommandBuilder()
  .setName("flip")
  .setDescription("Heads or tails?")

export async function execute(interaction: CommandInteraction) {
  const possibilities = ["heads", "tails"]
  const coin = possibilities[Math.floor(Math.random() * possibilities.length)]

  interaction.reply({
    content: `@${interaction.member?.user.username}, ${coin}!`,
    ephemeral: true
  })
}
