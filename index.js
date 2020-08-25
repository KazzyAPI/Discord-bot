const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, admin } = require('./configs.json');
var fs = require('fs');
const Enmap = require("enmap");
client.points = new Enmap({name: "points"});
//const admin = "480320079200911360";

// file is included here:
const util = require('util');
const { spawn } = require('child_process');
const execFile = util.promisify(require('child_process').execFile);
const icon = "https://images-ext-1.discordapp.net/external/O27vrnZs5PvsZ-koseYizIK6NGohq205MUd380taZfA/https/steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/45/457e381c7a30c1a34684a87187633668a01f3c48_full.jpg";
const footertext = "Kazzy's AIO Bot";
const nameTitle = "Kazzy's bot";
var test1 = [""];

client.once('ready', () => {
	console.log('Ready!');
});

function getRandomInt() {
	return Math.floor(Math.random() * Math.floor(10));
  }



client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	 if (message.guild) {
	const key = `${message.guild.id}-${message.author.id}`;
    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });
	// Code continued...
	//client.points.inc(key, "points");
  }
  // Rest of message handler


	if (command === 'credits') {
		const key = `${message.guild.id}-${message.author.id}`;
		const user = message.mentions.users.first() || client.users.get(args[0]);
		if (message.mentions.users.first() || client.users.get(args[0])) {
			// Ensure there is a points entry for this user.
			client.points.ensure(`${message.guild.id}-${user.id}`, {
				user: message.author.id,
				guild: message.guild.id,
				points: 0,
				level: 1
			  });
			  // Get their current points.
			  let userPoints = client.points.get(`${message.guild.id}-${user.id}`, "points");
			  message.channel.send({embed: {
				color: 16711680,
				title: `Credits`,
				description: `***User is currently on ***: ${userPoints} \n Want more credits? Contact a admin for prices!`,
				author: {
				name: footertext,
				icon_url: icon
				}
			  }});
		} else {
			message.channel.send({embed: {
				color: 16711680,
				title: `Credits`,
				description: `***Your credits***: ${client.points.get(key, "points")} \n Want more credits? Contact a admin for prices!`,
				author: {
				name: footertext,
				icon_url: icon
				}
			  }});
		}
	} else if (command === 'give') {
		if(message.author.id !== admin) {
			return
		}
			
		
			const user = message.mentions.users.first() || client.users.get(args[0]);
			if(!user) return message.reply("You must mention someone or give their ID!");
		
			const pointsToAdd = parseInt(args[1], 10);
			if(!pointsToAdd) 
			  return message.reply("You didn't tell me how many points to give...")
		
			// Ensure there is a points entry for this user.
			client.points.ensure(`${message.guild.id}-${user.id}`, {
			  user: message.author.id,
			  guild: message.guild.id,
			  points: 0,
			  level: 1
			});
			// Get their current points.
			let userPoints = client.points.get(`${message.guild.id}-${user.id}`, "points");
			userPoints += pointsToAdd;
			// And we save it!
			client.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")
			message.channel.send({embed: {
				color: 16711680,
				title: `Currency has been added!`,
				description: `User ${user.tag} has been given ${pointsToAdd}!\n
				***Given: *** : ${pointsToAdd}\n
				***User is currently on ***: ${userPoints}`,
				author: {
				name: footertext,
				icon_url: icon
				}
			  }});
		
			//message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userPoints} points.`);
		
	} else if (command === 'stopall' && message.author.id === admin) {
		message.channel.send({embed: {
			color: 16711680,
			title: "Succesfully stopped all commends sent to bot!"
		  }});
		 // child.kill();
		  proc.kill();
	} else if (command === 'report') {
		if (!args.length){
			return message.channel.send(`Please provide the correct arguements. ${prefix}report <id> <amount_to_report>`)
		}
		message.channel.send({embed: {
			color: 16711680,
			title: `Reporting ${args[0]} with ${args[1]} requests! `
		  }});
		  const le = spawn('node', ['report', `${args[0]}`, `${args[1]}`]);
	} else if (command === 'stop') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	} else if (command === 'commend') {
		if (!args.length) {
			return //message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		//const user = message.author.id;
		client.points.ensure(`${message.guild.id}-${message.author.id}`, {
			user: message.author.id,
			guild: message.guild.id,
			points: 0,
			level: 1
		  });
		  const key = `${message.guild.id}-${message.author.id}`;
		if (client.points.get(key, "points") <= args[1] || client.points.get(key, "points") <=0 && args[1] !=String) {
			return
		} else {
			message.channel.send({embed: {
				color: 16711680,
				title: `Commending  ${args[0]} with ${args[1]} commends`,
				description: `Amount of commends being sent: ${args[1]}`,
				author: {
				name: footertext,
				icon_url: icon
				}
			  }});
			  let userPoints = client.points.get(`${message.guild.id}-${message.author.id}`, "points");
				userPoints -= args[1];
			// And we save it!
				client.points.set(`${message.guild.id}-${message.author.id}`, userPoints, "points")
				const ls = spawn('node', ['commend', `${args[0]}`, `${args[1]}`]);
			
		}
		
	} else if (command === 'help') {
		  if (args[0] === 'report') {
			message.channel.send({embed: {
				color: 16711680,
				title: `${prefix}${args[0]} help description`,
				description: `Used to report people. To use this command do ${prefix}report <user> <amount>. Wait a few mins and done!`,
				author: {
					name: nameTitle,
					icon_url: icon
					},
					footer: {
						text: footertext,
						icon_url: icon
					}
			  }});
		  } else if(!args[0]) {
			message.channel.send({embed: {
				color: 16711680,
				description: `**${prefix}help** - Request a up-to-date version of what i can do!
				\n**${prefix}report <userid> <amount> 
				**- Will send requested amount of reports to specified userid.__** (Note i am not responsible for any troubles you cause. 
					This will never been given as a service.)**__
					\n**${prefix}commend <userid> <amount>** - Will send requested amount of reports to specified userid.
					\n**${prefix}workshopfollow <url> <amount>** - Will follow specified url with args given!
					\n**${prefix}commend <steamid> <amount>** - Will comment on specified users url!
					\n**${prefix}livematch <user>** - Will find specified user and return its match stats.
					\n**${prefix}track <steamid>** - Will track user and watch to see if user has been banned.
					\n**${prefix}stop** - Stops current process sent by user.
					\n**${prefix}stopall** - Stops all processes sent by all users
					\n**${prefix}commendstats <userid>** - Retrieves up to date commends for given userid.
					\n**${prefix}gamble <amount_of_commends> <number between 1-20> **- Gambles commends against random number generator.
					\n**${prefix}redeem <token>** - Redeems a purchased token
					\n**${prefix}credits** - view how much credits you have on your account!
					\n**${prefix}clear** <amount> - Clear the amount of messages stated, messages must be < 100.

					\n Want to know more? Type ${prefix}help <command> to get a description!`,
				author: {
				name: nameTitle,
				icon_url: icon
				},
				footer: {
					text: footertext,
					icon_url: icon
				}
			  }});
		  } else if (args[0] === 'commend') {
			message.channel.send({embed: {
				color: 16711680,
				title: `${prefix}${args[0]} help description`,
				description: `Used to commend people. To use this command do ${prefix}commend <user> <amount>. Wait a few mins and done!`,
				author: {
					name: nameTitle,
					icon_url: icon
					},
					footer: {
						text: footertext,
						icon_url: icon
					}
			  }});
		  } else if (args[0] === 'stop') {
			message.channel.send({embed: {
				color: 16711680,
				title: `${prefix}${args[0]} help description`,
				description: `Used to stop requested report / commend function. To use simple do ${prefix}${args[0]}`,
				author: {
					name: nameTitle,
					icon_url: icon
					},
					footer: {
						text: footertext,
						icon_url: icon
					}
			  }});
		  }else if (args[0] === 'stopall') {
			message.channel.send({embed: {
				color: 16711680,
				title: `${prefix}${args[0]} help description`,
				description: `Used to stop all and restart bot. **ADMIN ONLY CMD**, to use this just type ${prefix}${args[0]}`,
				author: {
					name: nameTitle,
					icon_url: icon
					},
					footer: {
						text: footertext,
						icon_url: icon
					}
			  }});
		  }else if (args[0] === 'redeem') {
			message.channel.send({embed: {
				color: 16711680,
				title: `${prefix}${args[0]} help description`,
				description: `Used to redeem given token for a balance. To do this do ${prefix}${args[0]} <token>`,
				author: {
					name: nameTitle,
					icon_url: icon
					},
					footer: {
						text: footertext,
						icon_url: icon
					}
			  }});
		  }else if (args[0] === 'commendstats') {
			message.channel.send({embed: {
				color: 16711680,
				title: `${prefix}${args[0]} help description`,
				description: `Used to check the amount of commends given target has. do ${prefix}${args[0]} <userid>`,
				author: {
					name: nameTitle,
					icon_url: icon
					},
					footer: {
						text: footertext,
						icon_url: icon
					} 

					
			  }});
		  } else {
			message.channel.send({embed: {
				color: 16711680,
				title: `Oops! Seems we found a error!`,
				description: `We currently dont have ${args[0]} as a command, if your having troubles try !help to see some commends <3`,
				author: {
					name: nameTitle,
					icon_url: icon
					},
					footer: {
						text: footertext,
						icon_url: icon
					} 

					
			  }});
		  }
	} else if (command === 'commendstats') {
		if (!args.length) {
			message.channel.send({embed: {
				color: 16711680,
				title: `Oops there seems to be a error!`,
				description: `You must specify steam id to check! Please type !help if you need help`,
				author: {
				name: footertext,
				icon_url: icon
				}
			  }});

		}
		message.channel.send({embed: {
			color: 16711680,
			title: `Please wait while i fetch this....`,
			author: {
				name: nameTitle,
				icon_url: icon
				},
				footer: {
					text: footertext,
					icon_url: icon
				}
		  }});
		const lss = spawn('node', ['commendhist.js', `${args[0]}`, `1`]);
		//const lss = spawn('node', ['commendhist.js', `https://steamcommunity.com/profiles/76561199055145388/`, `1`]);
		//message.channel.send(startCommend);
		
	} else if (command === 'addadmin' && message.author.id == admin) {
		if(!args.length) {
			message.channel.send("Send a admin pls");
		} 
		test1.push(args[0]);
		for (var i in test1) {
			message.channel.send(test1[i]);
		}


		//message.channel.send(test1.)
		//message.channel.send(getRandomInt()); WORKING NUMBER GENEATOR FOR GAMBLE!
		
	} else if (command === 'gamble') {
		if(!args.length) {
			return
		}
		const key = `${message.guild.id}-${message.author.id}`;
		if (args[0] <= client.points.get(key, "points") && args[1] == getRandomInt()) {
			if (client.points.get(key, "points") <= 0) {
				return
			}
			let userPoints = client.points.get(`${message.guild.id}-${message.author.id}`, "points");
			userPoints += args[1] * 2;
			client.points.set(`${message.guild.id}-${message.author.id}`, userPoints, "points")
			message.channel.send(`You won! You now have : ${client.points.get(key, "points")}`)
		} else {
			let userPoints = client.points.get(`${message.guild.id}-${message.author.id}`, "points");
			userPoints -= args[1];
			client.points.set(`${message.guild.id}-${message.author.id}`, userPoints, "points")
			message.channel.send(`You lost! Your current balance: ${client.points.get(key, "points")}`)
		}


	}else if (command === 'clear') {
		if(!args.length) {

		}
		message.channel.send({embed: {
			color: 16711680,
			title: `Clearing ${args[0]} amount of messages please wait....`,
			author: {
				name: nameTitle,
				icon_url: icon
				},
				footer: {
					text: footertext,
					icon_url: icon
				}
		  }});
		const amount = parseInt(args[0]) + 2;
		setTimeout(() => {}, 2000);


		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}
});

client.login(token);


function sleep(ms) {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }   