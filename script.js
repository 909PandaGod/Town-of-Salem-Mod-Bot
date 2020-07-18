// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
var possibleTownRoles = ['Investigator', 'Lookout', 'Psychic', 'Sheriff', 'Spy', 'Tracker', 'Jailor',
	'Vampire Hunter', 'Veteran', 'Vigilante', 'Bodyguard', 'Doctor', 'Crusader', 'Trapper', 'Escort', 'Mayor',
	'Medium', 'Retributionist', 'Transporter'];
client.once('ready', () => {
	console.log('Ready!');
});
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
function findTownRoles(roleList, doExe) {
	var townRoles = [];
	for (var i = 0; i < roleList.length; i++) {
		if (possibleTownRoles.includes(roleList[i]) &&
			(!doExe || (roleList[i] != 'Jailor' && roleList[i] != 'Mayor'))) {
			townRoles.push(roleList[i]);
		}
	}
	return townRoles;
}
function chooseTownRole(category, isJailor, isVet, isMayor, isRetri, doVH) {
	//other variables(is[role]) ensure no duplicates of unique roles
	//doVH ensures there is no VH if there are no Vampires
	switch (category) {
		case ('TI'):
			switch (Math.floor(Math.random() * 4)) {
				case (0):
					return 'Investigator';
				case (1):
					return 'Lookout';
				case (2):
					return 'Sheriff';
				case (3):
					return 'Spy';
			}
		case ('TK'):
			if (isJailor && isVet && doVH) {
				switch (Math.floor(Math.random() * 2)) {
					case (0):
						return 'Vampire Hunter';
					case (1):
						return 'Vigilante';
				}
			}
			else if (isJailor && isVet && !doVH) {
				return 'Vigilante';
			}
			else if (isJailor && !isVet && doVH) {
				switch (Math.floor(Math.random() * 3)) {
					case (0):
						return 'Vampire Hunter';
					case (1):
						return 'Veteran';
					case (2):
						return 'Vigilante';
				}
			}
			else if (!isJailor && isVet && doVH) {
				switch (Math.floor(Math.random() * 3)) {
					case (0):
						return 'Jailor';
					case (1):
						return 'Vampire Hunter';
					case (2):
						return 'Vigilante';
				}
			}
			else if (isJailor && !isVet && !doVH) {
				switch (Math.floor(Math.random() * 2)) {
					case (0):
						return 'Veteran';
					case (1):
						return 'Vigilante';
				}
			}
			else if (!isJailor && isVet && !doVH) {
				switch (Math.floor(Math.random() * 2)) {
					case (0):
						return 'Jailor';
					case (1):
						return 'Vigilante';
				}
			}
			else if (!isJailor && !isVet && doVH) {
				switch (Math.floor(Math.random() * 4)) {
					case (0):
						return 'Jailor';
					case (1):
						return 'Vampire Hunter';
					case (2):
						return 'Veteran';
					case (3):
						return 'Vigilante';
				}
			}
			else {
				switch (Math.floor(Math.random() * 3)) {
					case (0):
						return 'Jailor';
					case (1):
						return 'Veteran';
					case (2):
						return 'Vigilante';
				}
			}
		case ('TP'):
			switch (Math.floor(Math.random() * 2)) {
				case (0):
					return 'Bodyguard';
				case (1):
					return 'Doctor';
			}
		case ('TS'):
			if (isMayor && isRetri) {
				switch (Math.floor(Math.random() * 3)) {
					case (0):
						return 'Escort';
					case (1):
						return 'Medium';
					case (2):
						return 'Transporter';
				}
			}
			else if (isMayor && !isRetri)
				switch (Math.floor(Math.random() * 4)) {
					case (0):
						return 'Escort';
					case (1):
						return 'Medium';
					case (2):
						return 'Retributionist';
					case (3):
						return 'Transporter';
				}
			else if (!isMayor && isRetri) {
				switch (Math.floor(Math.random() * 4)) {
					case (0):
						return 'Escort';
					case (1):
						return 'Mayor';
					case (2):
						return 'Medium';
					case (3):
						return 'Transporter';
				}
			}
			else {
				switch (Math.floor(Math.random() * 5)) {
					case (0):
						return 'Escort';
					case (1):
						return 'Mayor';
					case (2):
						return 'Medium';
					case (3):
						return 'Retributionist';
					case (4):
						return 'Transporter';
				}
			}
	}
}
function startClassicGame(playerNum, playerList) {
	{
		var possibleRoleList = ['Jailor', 'Sheriff', 'Mafioso', 'Godfather', 'Jester', 'Lookout',//Guaranteed, 
			'Doctor', 'Escort', 'Framer',                                //no matter how many players there are
			'Medium', 'Investigator', 'Executioner',
			'Town Killing', 'Serial Killer', 'Random Town']; //First random Catagories
		var roleList = possibleRoleList;
		while (roleList.length > playerNum) {
			roleList.pop();
		}
		shuffle(roleList);
		var isJailor = false;
		var isVet = false;
		var isMayor = false;
		var isRetri = false;
		for (var i = 0; i < roleList.length; i++) {
			var target;
			var role = roleList[i];
			switch (role) {
				case ('Executioner'):
					var possibleTargets = findTownRoles(roleList, true);
					shuffle(possibleTargets);
					target = playerList[findIndex(possibleTargets[0])].username + '#' +
						playerList[findIndex(possibleTargets[0])].discriminator;
					break;
				case ('Jailor'):
					isJailor = true;
					break;
				case ('Veteran'):
					isVet = true;
					break;
				case ('Mayor'):
					isMayor = true;
					break;
				case ('Retributionist'):
					isRetri = true;
					break;
				case ('Town Killing'):
					role = chooseTownRole('TK', isJailor, isVet, isMayor, isRetri, false);
					break;
				case ('Random Town'):
					role = chooseTownRole('RT', isJailor, isVet, isMayor, isRetri, false);
					break;
			}
			playerList[i].send("Your role is " + role);
			if (role == 'Executioner')
				playerList[i].send("Your target is " + target);
		}
	}//role assignment
}
function startAllAnyGame(playerNum, playerList) {

}
function startRainbowChaosGame(playerNum) {


}
function startBeginnerGame(playerNum) {


}
client.on("message", message => {
	/*
	if (message.content === "!ping") {
		// send back "Pong." to the channel the message was sent in
		message.channel.send("Pong.");
	}
	*/
	var doExecutiveOverride = false;
	if (message.content.startsWith("!start override") && message.author.id == 'Hidden') {
		doExecutiveOverride = true;
		message.channel.send('Override Confirmed');
	}
	else if (message.content.startsWith("!start override") && message.author.id != 'Hidden') {
		message.channel.send('Override Denied');
	}
	if (message.content.startsWith("!start")) {
		var playerNum = 0;
		var playerList = [];
		var gameMode;
		//var endtime = Date.now() + 180000;
		const gameHeadcountEmbed = new Discord.MessageEmbed()
			.setColor("#5555FF")
			.setTitle("Game Headcount")
			.setDescription("React with ⚪ within 3 min to join the game.")
			.setFooter("React with ❌ to skip the remaining time.")
		message.channel.send(gameHeadcountEmbed).then((headcountMSG) => {
			headcountMSG.react('⚪').then(() => headcountMSG.react('❌')).then(() => {
				// Same filter but include ❌
				const headcountFilter = ({ emoji }, user) => ['⚪', '❌'].includes(emoji.name) && user.id != headcountMSG.author.id;

				// Create the collector
				const collector = headcountMSG.createReactionCollector(headcountFilter, {
					max: 20,
					time: 180000,
				});
				// collect is emitted every time someone reacts
				collector.on('collect', ({ emoji }, user) => {
					// Stop the collector on ❌
					//console.log('collected');
					//console.log(emoji.name);
					if (emoji.name === '❌')
						collector.stop();
					else if (!playerList.includes(user)) {
						playerNum++;
						playerList.push(user);
						//console.log(user);
						//user.send('test');
					}
				});

				// end is emitted:
				// when there are 20 reactions (limit)
				// after 3 minutes (time) or
				// when the collector is manually stopped (user by default)
				collector.on('end', (collected, reason) => {
					if (reason === 'limit' && !doExecutiveOverride)
						message.channel.send('Too many people. Please split into to groups and try again.');
					else if (playerNum < 9 && !doExecutiveOverride)
						message.channel.send('Not enough players. Try again with more participants.');
					else {
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
									{ name: "1⃣ Classic", value: "'Ranked'" },
									{ name: "2⃣ All Any", value: "'All Any'" },
									{ name: "3⃣ Rainbow Chaos", value: "'Rainbow Mode'" },
									{ name: "4⃣ Beginner", value: "'Classic'" },
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
													return ['1⃣', '2⃣', '3⃣', '4⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
												}
												sentMessage.awaitReactions(confirmationFilter, { max: 1, time: 60000, errors: ['time'] })
													.then(collected => {
														const reaction = collected.first();
														if (reaction.emoji.name === '1⃣') {
															message.channel.send("Classic Mode Selected.");
															startClassicGame(playerNum, playerList);
														}
														else if (reaction.emoji.name === '2⃣') {
															message.channel.send("All Any Mode Selected.");
															startAllAnyGame(playerNum, playerList);
														}
														else if (reaction.emoji.name === '3⃣') {
															message.channel.send("Rainbow Chaos Mode Selected.");
															startRainbowChaosGame(playerNum, playerList);
														}
														else {
															message.channel.send("Beginner Mode Selected");
															startBeginnerGame(playerNum, playerList);
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
					}
				})
			})
		})

	}
});

// login to Discord
{
	client.login("Hidden");
}
