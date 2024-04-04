import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { BadRequest } from "./_errors/bad-request";

export async function checkIns(app: FastifyInstance) {
  // /attendees/${attendeeId}/checkin
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/check-in",
    {
      schema: {
        summary: "Check in an attendee",
        tags: ["check-ins"],
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
            201: z.null(),
            400: z.object({
                message: z.string(),
            }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      // User can only do one check in
      const checkIn = await prisma.checkIn.findFirst({
        where: {
          attendeeId,
        },
      });

        if (checkIn) {
            throw new BadRequest("Attendee already checked in");
        }

        await prisma.checkIn.create({
            data: {
                attendeeId,
            },
        });

        return reply.status(201).send();
    }
  );
}
