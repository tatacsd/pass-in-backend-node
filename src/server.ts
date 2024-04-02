import fastify from 'fastify';


//API -> Application Programming Interface
// It will be accessed by the front-end application

// Native driver -> pg, mysql, sqlite -> low level
// Query builder -> Knex.js, Bookshelf.js -> medium level
// ORM -> TypeORM, Sequelize, Prisma, drizzle -> high level (using version like migrations, entities, etc)

const app = fastify();

app.get('/', async (request, reply) => {
    return { hello: 'world' };
});

app.listen({port:3333}).then(() => {
    console.log('HTTP server is running! https://localhost:3333');
} );