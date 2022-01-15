import Fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'path';
import FastifyCors from 'fastify-cors';
import Database from './database.js';

const __dirname = path.resolve();
dotenv.config({path: __dirname + '/.env'});

const database = new Database();
await database.authenticate();

const fastify = Fastify({
  logger: true,
});
fastify.register(FastifyCors);

fastify.get('/', async (request, reply) => {
  return {hello: 'world'};
});

fastify.get('/messages', async (request, reply) => {
  const messages = await database.Messages.findAll();
  return messages;
});

fastify.post('/messages', async (request, reply) => {
  const {title, content} = request.body;
  const result = await database.Messages.create({
    title,
    content,
  });
  return result;
});

fastify.delete('/messages/:id', async (request, reply) => {
  const {id} = request.params;
  await database.Messages.destroy({
    where: {
      id,
    },
  });
  return 'ok';
});

fastify.put('/messages/:id', async (request, reply) => {
  const {id} = request.params;
  const {title, content} = request.body;
  console.log({title, content, id});
  await database.Messages.update(
    {title, content},
    {
      where: {
        id,
      },
    }
  );
  return 'ok';
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
