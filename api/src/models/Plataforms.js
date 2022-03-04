const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {  // definir mi entidades
  // defino el modelo
  sequelize.define('plataforms', { // tabla de Generos
    name : { // nombre del genero
           type: DataTypes.STRING,
           allowNull: false,},
    });
};

// Tabla de Generos de Plataforms
//   - ID
//   - Nombre