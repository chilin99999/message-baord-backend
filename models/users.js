export default function (database, DataTypes) {
  const Users = database.define(
    'users',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );

  Users.sync({alter: true});

  return Users;
}
