module.exports = function(sequelize, DataTypes) {
  var Spots = sequelize.define("Spots", {
    name: DataTypes.STRING
  },
    {
      classMethods: {
        associate: function(models) {
          Spots.hasMany(models.Location, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Spots;
};