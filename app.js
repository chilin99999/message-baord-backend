import Fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'path';
import FastifyCors from 'fastify-cors';
import database from './database.js';
import MessagesRoutes from './routes/messages.js';

const __dirname = path.resolve();
dotenv.config({path: __dirname + '/.env'});

await database.initial();

const fastify = Fastify({
  logger: true,
});
fastify.register(FastifyCors);
fastify.register(MessagesRoutes, {prefix: '/messages'});

fastify.get('/', async (request, reply) => {
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
