import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { NotFound } from "./_errors/not-found";

export async function getEventAttendees(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Get all attendees for an event",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid(),
        }),

        querystring: z.object({
          query: z.string().nullish(), // nullable vs nullish -> nullish allows null and undefined while nullable allows only null
          pageIndex: z.string().nullish().default("0").transform(Number), // default to 0 if not provided
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
                checkInAt: z.date().nullable(),
              })
            ),
          }),
          404: z.object({
            message: z.string(),
          }),
            
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { pageIndex, query} = request.query;

      // Fetch all attendees for the event
      const attendees = await prisma.attendee.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          checkIn: {
            select: {
              createdAt: true,
            },
          
          },
        },
        where: query ? {
          eventId,
          name: {
            contains: query, // `iLike` is case-insensitive search
          },
        } : {
          eventId,
        },
        take: 10,
        skip: pageIndex * 10, // it will skip 10 records for each page
        orderBy: {
          createdAt: "desc",
        },
      });


      // if no attendees found
      if (!attendees) {
        throw new NotFound("No attendees found");
      }

      return reply.status(200).send({
        attendees: attendees.map((attendee) => ({
          id: attendee.id.toString(),
          name: attendee.name,
          email: attendee.email,
          createdAt: attendee.createdAt,
          checkInAt: attendee.checkIn?.createdAt ?? null,
        })),
      });
    }
  );
}
