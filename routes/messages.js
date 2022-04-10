import database from '../database.js';

export default function (fastify, opts, done) {
  fastify.get('/', async () => {
    const messages = await database.Messages.findAll();
    return messages;
  });

  fastify.post('/', async (request) => {
    const {title, content} = request.body;
    const result = await database.Messages.create({
      title,
      content,
    });
    return result;
  });

  fastify.delete('/:id', async (request) => {
    const {id} = request.params;
    await database.Messages.destroy({
      where: {
        id,
      },
    });
    return 'ok';
  });

  fastify.put('/:id', async (request) => {
    const {id} = request.params;
    const {title, content} = request.body;
    console.log({title, content, id});
    await database.Messages.update(
      {title, content},
      {
        where: {
          id,
        },
      },
    );
    return 'ok';
  });

  done();
}
