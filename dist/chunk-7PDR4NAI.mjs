import {
  generateSlug
} from "./chunk-IGN54WQQ.mjs";
import {
  BadRequest
} from "./chunk-PAYBZHHE.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvents(app) {
  app.withTypeProvider().post(
    "/events",
    {
      schema: {
        summary: "Create a new event",
        tags: ["events"],
        body: z.object({
          title: z.string({ invalid_type_error: "Title must be a string" }).min(3, { message: "Title must be at least 3 character long" }).max(255, { message: "Title must be at most 255 characters long" }),
          details: z.string().optional(),
          maxAttendees: z.number().int().positive().nullable()
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid()
          }),
          400: z.object({
            message: z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { title, details, maxAttendees } = request.body;
      const slug = generateSlug(title);
      const existingSlug = await prisma.event.findFirst({
        where: {
          slug
        }
      });
      if (existingSlug) {
        throw new BadRequest("Event with this title already exists");
      }
      const event = await prisma.event.create({
        data: {
          title,
          details,
          slug,
          maxAttendees
        }
      });
      return reply.code(201).send({ eventId: event.id });
    }
  );
}

export {
  createEvents
};
