export default function (database, DataTypes) {
  const Messages = database.define(
    'messages',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    },
  );

  Messages.sync({alter: true});

  return Messages;
}
