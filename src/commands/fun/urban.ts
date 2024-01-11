import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import randomColor from "randomcolor";
import { hexToDecimal, hex2rgb } from "../../lib/colors";
import axios from "axios";

const convertUrbanTexts = (text: string) => text.replace(/\[(.*?)\]/g, (match, p1) => `[${p1}](https://www.urbandictionary.com/define.php?term=${p1.replace(/ /g, "%20")})`)


export const data = new SlashCommandBuilder()
  .setName("urban")
  .setDescription("Returns the first result in Urban Dictionary.")
  .addStringOption(option =>
    option.setName("term")
      .setDescription("Search term")
      .setRequired(true))

export async function execute(interaction: CommandInteraction) {
  const term = interaction.options.get("term");

  const urbanDictionary = await axios.get("http://api.urbandictionary.com/v0/define?term=" + term?.value);
  const list = urbanDictionary.data.list;

  if (list.length !== 0) {
    const random = Math.floor(Math.random() * list.length)
    const item = list[random]

    return interaction.reply({
      embeds: [
        {
          color: hexToDecimal(randomColor()),
          title: item.word,
          description: `
${convertUrbanTexts(item.definition)}

**example**
${convertUrbanTexts(item.example)}
          `,
          fields: [
            {
              name: "thumbs up",
              value: item.thumbs_up,
              inline: true
            },
            {
              name: "thumbs down",
              value: item.thumbs_down,
              inline: true
            }
          ],
          footer: {
            text: `by ${item.author}`
          }
        }
      ]
    })
  }

  return interaction.reply(`No results were found for your search term in Urban Dictionary. (**${term?.value}**)`)
}
