module.exports = (client, Sequelize) => {
  const model = client.sequelize.define('attendance', {
    // attributes
    player: {
      type: Sequelize.STRING,
      allowNull: false
    },
    raid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    raidID: {
      type: Sequelize.BIGINT(20),
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    channelID: {
      type: Sequelize.BIGINT(20),
      allowNull: false
    },
    guildID: {
      type: Sequelize.BIGINT(20),
      allowNull: false
    }
  }, {
    // options
  });
  model.sync({ alter: true });
  return model;
}