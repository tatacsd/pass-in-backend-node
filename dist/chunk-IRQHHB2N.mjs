import {
  Conflict
} from "./chunk-C7TRTTDH.mjs";
import {
  BadRequest
} from "./chunk-PAYBZHHE.mjs";
import {
  NotFound
} from "./chunk-NS4G56TP.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/register-for-event.ts
import { z } from "zod";
async function registeForEvent(app) {
  app.withTypeProvider().post(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Register for an event",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid()
        }),
        body: z.object({
          name: z.string().min(3).max(255),
          email: z.string().email()
        }),
        response: {
          201: z.object({
            attendeeId: z.number().int()
          })
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;
      const existingAttendee = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            email,
            eventId
          }
        }
      });
      if (existingAttendee) {
        throw new BadRequest("Attendee already registered for this event");
      }
      const [event, eventAttendeesCount] = await Promise.all([
        prisma.event.findUnique({
          where: {
            id: eventId
          }
        }),
        prisma.attendee.count({
          where: {
            eventId
          }
        })
      ]);
      if (!event) {
        throw new NotFound("Event not found");
      }
      if (event?.maxAttendees && eventAttendeesCount >= event.maxAttendees) {
        throw new Conflict(
          "It's not possible to register for this event. The maximum number of attendees has been reached"
        );
      }
      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId
        }
      });
      return reply.code(201).send({ attendeeId: attendee.id });
    }
  );
}

export {
  registeForEvent
};
