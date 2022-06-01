import database from '../database.js';
import Hash from '../utils/hash.js';
import JWT from '../utils/jwt.js';

export default function (fastify, opts, done) {
  fastify.get('/:username', async (request) => {
    const {username} = request.params;
    const user = await database.Users.findOne({
      where: {username},
    });
    return user;
  });

  fastify.post('/login', async (request) => {
    const {username, password} = request.body;
    const user = await database.Users.findOne({
      where: {
        username,
        password: Hash.create(password),
      },
    });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return JWT.sign({
      username: user.username,
    });
  });

  fastify.post('/', async (request) => {
    const {username, nickname, password} = request.body;
    const result = await database.Users.create({
      username,
      nickname,
      password: Hash.create(password),
    });
    return result;
  });

  done();
}
