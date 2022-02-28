const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
//const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {  // definir mi entidades
  // defino el modelo
  sequelize.define('genres', { // tabla de Generos
    name : { // nombre del genero
           type: DataTypes.STRING,
           allowNull: false,},
    });
};

// Tabla de Generos de video juegos
// - [ ] Genero con las siguientes propiedades:
//   - ID
//   - Nombre