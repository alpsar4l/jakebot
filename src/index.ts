import { ActivityType, Client } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import catchBannedWords from "./events/catchBannedWords";
import prisma from "./lib/prisma";
import getUserFromMention from "./helpers/getUserFromMention";
import catchMentions from "./events/catchMentions";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages", "MessageContent"],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");

  if (client.user) {
    client.user.setPresence({
      activities: [{
        name: "howdy",
        type: ActivityType.Custom
      }],
    });
  }
});


client.on("guildCreate", async (guild) =>
  await deployCommands({ guildId: guild.id }));

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand())
    return;

  const { commandName } = interaction;

  if (commandName === "ping" && interaction.guild) {
    await deployCommands({ guildId: interaction.guild.id });
  }

  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.on("messageCreate", catchBannedWords);
client.on("messageCreate", catchMentions);

client.login(config.DISCORD_TOKEN);

