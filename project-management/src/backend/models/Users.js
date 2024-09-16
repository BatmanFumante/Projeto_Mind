const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    image: {
      type: 'blob', // Tipo blob para armazenar dados binários
      nullable: true // Permite que a coluna seja nula se nenhuma imagem for enviada
    }
  },
});
