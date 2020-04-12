const botSettings = require('./botsettings.json');
const Discord = require('discord.js');
const prefix = botSettings.prefix;
const ms = require("ms");
const bot = new Discord.Client({disableEveryone: true})

bot.on('ready', async () => {
  console.log(`Bot is ready ${bot.user.username}`);

});

bot.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  let messageArray = message.content.split(' ');
  let command = messageArray[0];
  let args = messageArray.slice(1);

  console.log(messageArray);
  console.log(command);
  console.log(args);

  if(!command.startsWith(prefix)) return;

  if(command === `${prefix}userinfo`){
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username)
      .setDescription('User Info')
      .setColor("#ff0008")
      .addField('Full Username', `${message.author.username}#${message.author.discriminator}`)
      .addField('ID', message.author.id)
      .addField('Created At', message.author.createdAt);

    message.channel.send(embed);

    return;

  }


    if(command === `${prefix}mute`) {
      //check if the mutee has the right perms to do so
      //check if command excecutor has the right permition to write ths command
      //if the mutee has the same or higher role that the muter return;
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Sorry Pal...\nIt looks like you dont have the right permissions!');
      //Get the mention user, return is it is none.
      let toMute = message.mentions.users.first();
      if(!toMute) return message.channel.send('You did not specify a user mention!');
      //mute action
      let role;
      try{
        role = (async() => { await message.guild.createRole({
          name: 'Apollo Muted',
          color: '#000000',
          permissions: []
        });
        })();

        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch(e){
        console.log(e.stack);
      }



      return;
    }
});

bot.login(botSettings.token);
