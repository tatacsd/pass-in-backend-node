import fastify from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const app = fastify();
const prisma = new PrismaClient({
    log: ['query'],
});

app.post("/events", async (request, reply) => {
    // Validate the request body
    const eventSchema = z.object({
        title: z.string().min(3).max(255),
        details: z.string().optional(),
        maxAttendees: z.number().int().positive().nullable(),
    });

    const data = eventSchema.parse(request.body);

    // Create the event
    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            slug: new Date().toISOString(), // temporary slug
            maxAttendees: data.maxAttendees,
        },
    });

    return reply.code(201).send({ eventId: event.id });
});


app.listen({port:3333}).then(() => {
    console.log('HTTP server is running! https://localhost:3333');
} );