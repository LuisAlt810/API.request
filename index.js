require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const CHANNEL_ID = '1392853061805936783';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setActivity('Giving milks to people', { type: ActivityType.Playing });

  const channel = await client.channels.fetch(CHANNEL_ID);
  if (!channel) {
    console.error('Channel not found!');
    return;
  }

  setInterval(async () => {
    try {
      const guild = channel.guild;
      await guild.members.fetch();

      const humanMembers = guild.members.cache.filter(member => !member.user.bot);
      if (humanMembers.size === 0) return;

      const randomUser = humanMembers.random();

      channel.send(`Giving Milk <@${randomUser.id}> guys why dont yall use do not disturb or silent mode`);
    channel.send("If you want to stop this then ban me!")
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, 3000);
});

client.login(process.env.DISCORD_TOKEN);
