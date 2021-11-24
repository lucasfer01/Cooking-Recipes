const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      vaidate: {
        notNull: {
          msg: 'El campo no puede estar vacio'
        }
      }
    },
    rate: {
      type: DataTypes.FLOAT,
      set(val) {
        return this.setDataValue('rate', parseFloat(val));
      },
    },
    healthRate: {
      type: DataTypes.FLOAT,
      set(val) {
        return this.setDataValue('healthRate', parseFloat(val));
      },
      validate: {
        isNumeric: {
          args: true,
          msg: 'Solo se permiten numeros'
        },
        min: 0,
        max: 100
      }
    },
    steps: {
      type: DataTypes.JSON
    },
    image: {
      type: DataTypes.STRING
    }
  });
};
