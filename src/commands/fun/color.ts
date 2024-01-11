import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import randomColor from "randomcolor";
import { hexToDecimal, hex2rgb } from "../../lib/colors";

export const data = new SlashCommandBuilder()
  .setName("color")
  .setDescription("Who wouldn't want to see one of the paints left on my little elves' palettes?")

export async function execute(interaction: CommandInteraction) {
  const color: string = randomColor({
    format: "hex"
  })
  const rgb = hex2rgb(color)

  interaction.reply({
    embeds: [
      {
        title: "color",
        description: "one of the rare colors left in my little elves' palettes before taking a break.",
        color: hexToDecimal(color),
        fields: [
          {
            name: "hex",
            value: color,
            inline: true
          },
          {
            name: "rgb",
            value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            inline: true
          }
        ],
        footer: {
          text: "there are other paints, would you like to see them?"
        }
      }
    ]
  })
}
