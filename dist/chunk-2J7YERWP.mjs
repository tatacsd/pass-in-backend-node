import {
  BadRequest
} from "./chunk-PAYBZHHE.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/check-ins.ts
import { z } from "zod";
async function checkIns(app) {
  app.withTypeProvider().get(
    "/attendees/:attendeeId/check-in",
    {
      schema: {
        summary: "Check in an attendee",
        tags: ["check-ins"],
        params: z.object({
          attendeeId: z.coerce.number().int()
        }),
        response: {
          201: z.null(),
          400: z.object({
            message: z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { attendeeId } = request.params;
      const checkIn = await prisma.checkIn.findFirst({
        where: {
          attendeeId
        }
      });
      if (checkIn) {
        throw new BadRequest("Attendee already checked in");
      }
      await prisma.checkIn.create({
        data: {
          attendeeId
        }
      });
      return reply.status(201).send();
    }
  );
}

export {
  checkIns
};
