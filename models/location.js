module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        len: [1]
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      len: [1]
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      len: [1]
    }
  },
    {
      classMethods: {
        associate: function(models) {
          Location.belongsTo(models.Spots, {
            foreignKey: {
              allowNull: true
            }
          });
        }
      }
    }
  );
  return Location;
};
