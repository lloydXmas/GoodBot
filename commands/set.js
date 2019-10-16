const fs = require("fs");
const Discord = require("discord.js");


exports.run = (client, message, args) => {

	message.delete().catch(O_o=>{}); 
	if (!args[1] || !args[2]) {
		return false;
	}

	const classArg = args[1];
	const roleArg = args[2]
	const className = classArg.charAt(0).toUpperCase() + classArg.slice(1).toLowerCase();
	const roleName = roleArg.charAt(0).toUpperCase() + roleArg.slice(1).toLowerCase();
	const user = args[0] ? args[0] : message.member.displayName;
	const playerName = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();

	
	// Write to class json file
	let fileName = 'data/' + message.guild.id + '-class.json';
	let parsedList = {};
	if (fs.existsSync(fileName)) {
		currentList = fs.readFileSync(fileName, 'utf8');
		parsedList = JSON.parse(currentList);
	}
		parsedList[playerName] = className;
	fs.writeFileSync(fileName, JSON.stringify(parsedList)); 

	// Write to roles json file
	fileName = 'data/' + message.guild.id + '-roles.json';
	parsedList = {};
	if (fs.existsSync(fileName)) {
		currentList = fs.readFileSync(fileName, 'utf8');
		parsedList = JSON.parse(currentList);
	}
	parsedList[playerName] = roleName;
	fs.writeFileSync(fileName, JSON.stringify(parsedList)); 


	message.channel.send('Updated ' +  playerName + ' as ' + className + '/' + roleName + '.');

};