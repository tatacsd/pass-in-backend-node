import {
  NotFound
} from "./chunk-NS4G56TP.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-attendee-badge.ts
import { z } from "zod";
async function getAttendeeBadge(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/badge", {
    schema: {
      summary: "Get attendee badge",
      tags: ["attendees"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        200: z.object({
          badge: z.object({
            name: z.string(),
            email: z.string(),
            event: z.string(),
            checkingURL: z.string()
          })
        }),
        404: z.object({
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true
          }
        }
      },
      where: {
        id: attendeeId
      }
    });
    if (!attendee) {
      throw new NotFound("Attendee not found");
    }
    const baseURL = `${request.protocol}://${request.hostname}`;
    const checkingURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);
    return reply.send({
      badge: {
        name: attendee.name,
        email: attendee.email,
        event: attendee.event.title,
        checkingURL: checkingURL.toString()
      }
    });
  });
}

export {
  getAttendeeBadge
};
