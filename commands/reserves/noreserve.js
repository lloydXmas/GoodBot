const Discord = require("discord.js");

exports.run = async function(client, message, args) {
	if (!client.permission.manageChannel(message.member, message.channel)) {
		return false;
	}

    let raid = await client.raid.get(client, message.channel);
    if (!raid.softreserve) {
        return message.author.send("Soft reserve is not currently enabled for this raid.");
    }

    let includes = [
        {model: client.models.signup, as: 'signup', foreignKey: 'signupID'},
    ];
    
    client.models.raidReserve.findAll({where: {RaidID: raid.id}, include: includes}).then((raidReserves) => {
        let hasReserve = [];
        for (key in raidReserves) {
            if (raidReserves[key].signup) {
                hasReserve.push(raidReserves[key].signup.player);
            }
        }
        
        client.models.signup.findAll({where: {RaidID: raid.id, signup: 'yes'}}).then(async (signups) => {
            let noReserve = [];
            for (key in signups) {
                let signup = signups[key];
                if (!hasReserve.includes(signup.player)) {
                    noReserve.push(signup.player);
                }
            }
            if (noReserve.length) {
                let notifyList = await client.notify.makeList(client, message.guild, noReserve);
                message.channel.send('The following players still need to reserve an item:');
                message.channel.send(notifyList);
            } else {
                message.channel.send('All signed up players have a reserve.');
            }
        });
    });

};