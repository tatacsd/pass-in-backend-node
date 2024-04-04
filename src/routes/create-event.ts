import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { generateSlug } from "../utils/generate-slug";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { BadRequest } from "./_errors/bad-request";

export async function createEvents(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events",
    {
      schema: {
        summary: "Create a new event",
        tags: ["events"],
        body: z.object({
          title: z
            .string({ invalid_type_error: "Title must be a string" })
            .min(3, { message: "Title must be at least 3 character long" })
            .max(255, { message: "Title must be at most 255 characters long" }),
          details: z.string().optional(),
          maxAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maxAttendees } = request.body;

      const slug = generateSlug(title);

      // Check if the slug already exists
      const existingSlug = await prisma.event.findFirst({
        where: {
          slug,
        },
      });

      if (existingSlug) {
        throw new BadRequest("Event with this title already exists");
      }

      // Create the event
      const event = await prisma.event.create({
        data: {
          title,
          details,
          slug,
          maxAttendees,
        },
      });

      return reply.code(201).send({ eventId: event.id });
    }
  );
}
