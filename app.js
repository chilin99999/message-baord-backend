import Fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'path';
import FastifyCors from 'fastify-cors';
import database from './database.js';
import MessagesRoutes from './routes/messages.js';
import UsersRoutes from './routes/users.js';

const __dirname = path.resolve();
dotenv.config({path: __dirname + '/.env'});

await database.initial();

const fastify = Fastify({
  logger: true,
});
fastify.register(FastifyCors);
fastify.register(MessagesRoutes, {prefix: '/messages'});
fastify.register(UsersRoutes, {prefix: '/users'});

fastify.get('/', async () => {
  return {hello: 'world'};
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
