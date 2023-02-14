const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificult:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    station: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countriess: {
        type: DataTypes.ARRAY(DataTypes.STRING),
       foreingKey:true
      },
  },{timestamps:false});
};