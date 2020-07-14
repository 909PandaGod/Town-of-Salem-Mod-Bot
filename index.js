// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});


client.on("message", message => {
	/*
	if (message.content === "!ping") {
		// send back "Pong." to the channel the message was sent in
		message.channel.send("Pong.");
	}
	*/
	if (message.content.startsWith("!start")) {
		var playerNum = 0;
		//var endtime = Date.now() + 180000;
		const gameHeadcountEmbed = new Discord.MessageEmbed()
			.setColor("#5555FF")
			.setTitle("Game Headcount")
			.setDescription("React with ⚪ to join the game")
			.setFooter("3 minutes remaining
		var msg = message.channel.send(gameHeadcountEmbed)
		msg.react('⚪');
			
			console.log("Setting times...");
			var currTime = new Date();
			if (currTime.getMinutes >= 57) {
				var endTimeH = currTime.getHours + 1;
				var endTimeM = currTime.getMinutes - 57;
				var endTimeS = currTime.getSeconds;
			}
			else {
				var endTimeH = currTime.getHours;
				var endTimeM = currTime.getMinutes +3;
				var endTimeS = currTime.getSeconds;
			}
			console.log("Before Loop");
			while ((currTime.getHours != endTimeH || currTime.getMinutes != endTimeM || currTime.getSeconds != endTimeS) ) {
				//console.log("In loop");
				const headcountFilter = (reaction, user) => {
					return ['⚪'].includes(reaction.emoji.name) /*&& user.id === message.author.id*/;
				};
				sentMessage.awaitReactions(headcountFilter, { max: 1, time: 18000, errors: ['time'] })
					.then(collected => {
						const reaction = collected.first();
						playerNum++;
						console.log("Reaction logged");
					})
					.catch(collected => {
						console.log("No reaction logged")
					});
				/*
				if (
					currTime.getSeconds == (endTimeS - 5) && currTime.getMinutes == endTimeM ||
					currTime.getSeconds == (endTimeS - 10) && currTime.getMinutes == endTimeM ||
					currTime.getSeconds == (endTimeS - 15) && currTime.getMinutes == endTimeM ||
					currTime.getSeconds == (endTimeS - 20) && currTime.getMinutes == endTimeM ||
					currTime.getSeconds == (endTimeS - 25) && currTime.getMinutes == endTimeM ||
					currTime.getSeconds == (endTimeS - 30) && currTime.getMinutes == endTimeM ||
					currTime.getSeconds == (endTimeS) && (currTime.getMinutes == (endTimeM - 1) || currTime.getMinutes == (endTimeM + 59) ||
					currTime.getSeconds == (endTimeS - 30) && (currTime.getMinutes == (endTimeM - 1) || currTime.getMinutes == (endTimeM + 59) ||
					currTime.getSeconds == (endTimeS) && (currTime.getMinutes == (endTimeM - 2) || currTime.getMinutes == (endTimeM + 58) ||
					currTime.getSeconds == (endTimeS - 30) && (currTime.getMinutes == (endTimeM - 2) || currTime.getMinutes == (endTimeM + 58)
								)
						{

                }*/
				if (currTime.getSeconds == (endTimeS - 5) && currTime.getMinutes == endTimeM) {
					var newGameHeadcountEmbed = new Discord.MessageEmbed()
						.setColor("#5555FF")
						.setTitle("Game Headcount")
						.setDescription("React with ⚪ to join the game")
						.setDescription("React with ⚪ to join the game")
						.setFooter("5 seconds remaining")
					sentMessage.edit(newGameHeadcountEmbed);
				}
				else if (currTime.getSeconds == (endTimeS - 10) && currTime.getMinutes == endTimeM) {
					var newGameHeadcountEmbed = new Discord.MessageEmbed()
						.setColor("#5555FF")
						.setTitle("Game Headcount")
						.setDescription("React with ⚪ to join the game")
						.setFooter("10 seconds remaining")
					sentMessage.edit(newGameHeadcountEmbed);
				}
				else if (currTime.getSeconds == (endTimeS - 15) && currTime.getMinutes == endTimeM) {
					var newGameHeadcountEmbed = new Discord.MessageEmbed()
						.setColor("#5555FF")
						.setTitle("Game Headcount")
						.setDescription("React with ⚪ to join the game")
						.setFooter("15 seconds remaining")
					sentMessage.edit(newGameHeadcountEmbed);
				}
				else if (currTime.getSeconds == (endTimeS - 20) && currTime.getMinutes == endTimeM) {
					var newGameHeadcountEmbed = new Discord.MessageEmbed()
						.setColor("#5555FF")
						.setTitle("Game Headcount")
						.setDescription("React with ⚪ to join the game")
						.setFooter("20 seconds remaining")
					sentMessage.edit(newGameHeadcountEmbed);
				}
				var newGameHeadcountEmbed = new Discord.MessageEmbed()
					.setColor("#5555FF")
					.setTitle("Game Headcount")
					.setDescription("React with ⚪ to join the game")
					.setFooter("x seconds remaining")
				message.channel.send(newGameHeadcountEmbed)/*.then(sentMessage => {
					sentMessage.react('⚪')
				}); */
			}
			console.log("After loop");
				
		
			message.channel.send("Headcount Ended.").then(() => {
				const confirmStartEmbed = new Discord.MessageEmbed()
					.setColor("#55FF55")
					.setTitle("Confirm Game Start")
					.setDescription("Number of players: **" + playerNum.toString() + "**")
					.addFields(
						{ name: "✅ Confirm Game Start", value: "Start the game with " + playerNum.toString() + " players." },
						{ name: "❌ Cancel Game Start", value: "Do not start the game." },
					)
				const selectGameModeEmbed = new Discord.MessageEmbed()
					.setColor("#55FF55")
					.setTitle("Select Game Mode")
					.addFields(
						{ name: "1⃣ Classic", value: "Mafia Vs Town" },
						{ name: "2⃣ All Any", value: "Any Roles" },
						{ name: "3⃣ Chaos", value: "Chaotic Version of Classic" },
						{ name: "4⃣ Beginner", value: "Mafia Vs Town, Set Role List" },
					)
				message.channel.send(confirmStartEmbed).then(sentMessage => {
					sentMessage.react('✅').then(() => sentMessage.react('❌'));
					const confirmationFilter = (reaction, user) => {
						return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
					};
					sentMessage.awaitReactions(confirmationFilter, { max: 1, time: 60000, errors: ['time'] })
						.then(collected => {
							const reaction = collected.first();
							if (reaction.emoji.name === '✅') {
								message.channel.send(selectGameModeEmbed).then(sentMessage => {
									sentMessage.react('1⃣').then(() => sentMessage.react('2⃣')).then(() => sentMessage.react('3⃣')).then(() => sentMessage.react('4⃣'));
									const confirmationFilter = (reaction, user) => {
										return ['1⃣', '2⃣', ':three:', ':four:'].includes(reaction.emoji.name) && user.id === message.author.id;
									}
									sentMessage.awaitReactions(confirmationFilter, { max: 1, time: 60000, errors: ['time'] })
										.then(collected => {
											const reaction = collected.first();
											if (reaction.emoji.name === '1⃣') {
												message.channel.send("Classic Mode Selected.");
											}
											else if (reaction.emoji.name === '2⃣') {
												message.channel.send("All Any Mode Selected.");
											}
											else if (reaction.emoji.name === '3⃣') {
												message.channel.send("Chaos Mode Selected.");
											}
											else {
												message.channel.send("Beginner Mode Selected");
											}
										})
										.catch(collected => {
											message.channel.send("Expired.");
										});
								});
							}
							else {
								message.channel.send("Canceled.");
							}
						})
						.catch(collected => {
							message.channel.send("Expired.");
						});
				});
			})
		})
			

	}

});

// login to Discord with your app's token
client.login("NzMxOTMzNTY2OTI5MzM4NDU4.XwtQZw.joc2h9X4TFzo4dXhDyxoFcv_-Vc");
