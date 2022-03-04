const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { // defini la entidad
  // defino el modelo
  sequelize.define('videogames', { // tabla de video juegos
    id         : { // id del video games
                 type         : DataTypes.UUID, // tipo de datos hastach
                 defaultValue : DataTypes.UUIDV4, // genera automaticamente un UUIDV4
                 primaryKey   : true,  // definir que va hacer mi clave primaria
                 allowNull    : false,},
    name       : { // nombre
                 type: DataTypes.STRING,
                 allowNull: false,},
    description: { // descripcion
                 type: DataTypes.STRING,
                 allowNull: false,},
    released   : { // fecha de lanzamiento
                 type: DataTypes.STRING,
                 allowNull: true,},
    rating     : {
                 type: DataTypes.STRING,
                 allowNull: true,},
    platforms  : { // plataformas
                 type: DataTypes.ARRAY(DataTypes.STRING),
                 allowNull: false,},
    image      : { // imagen
                 type: DataTypes.STRING,
                 allowNull: false,},
    created    : { // determina los creado en al app por defecto true
                  type: DataTypes.BOOLEAN,
                  allowNull: false,
                  defaultValue: true,},
 
     });
};

//    tabla de Video Juegos
// - [ ] Videojuego con las siguientes propiedades:
//   - ID: * No puede ser un ID de un videojuego ya existente en la API rawg
//   - Nombre *
//   - Descripción *
//   - Fecha de lanzamiento
//   - Rating
//   - Plataformas *
//   - created         // determina si el registro fue creado en al app