import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { NotFound } from "./_errors/not-found";

export async function getEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId",
    {
      schema: {
        summary: "Get event details",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
            200: z.object({
                id: z.string().uuid(),
                title: z.string(),
                details: z.string().nullable(),
                maxAttendees: z.number().nullable(),
                slug: z.string(),
                attendeesAmount: z.number(),
            }),
            404: z.object({
                message: z.string(),
            }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;

      // Fetch event details
      const event = await prisma.event.findUnique({
        select: {
            id: true,
            title: true,
            details: true,
            maxAttendees: true,
            slug: true,
            _count: {
                select: {
                    attendees: true,
                },
            },
            attendees: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
            
        },
        where: {
          id: eventId,
        },
      });

      if (!event) {
        throw new NotFound("Event not found");
      }

      return reply.send({ 
        id: event.id,
        title: event.title,
        details: event.details,
        maxAttendees: event.maxAttendees,
        slug: event.slug,
        attendeesAmount: event._count.attendees,
       });
    }
  );
}
