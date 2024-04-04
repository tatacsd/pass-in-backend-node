import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEventAttendees(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId/attendees",
    {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
            
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;

      // Fetch all attendees for the event
      const attendees = await prisma.attendee.findMany({
        where: {
          eventId,
        },
      });


      // if no attendees found
      if (!attendees) {
        return reply.status(404).send({
          message: "No attendees found",
        });
      }

      return reply.status(200).send({
        attendees,
      });
    }
  );
}
