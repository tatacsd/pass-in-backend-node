import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .get("/attendees/:attendeeId/badge", {
        schema: {
            summary: "Get attendee badge",
            tags: ["attendees"],
            params: z.object({
                attendeeId: z.coerce.number().int(),
            }),
            response:{
                200: z.object({
                    badge: z.object({
                        name: z.string(),
                        email: z.string(),
                        event: z.string(),
                        checkingURL: z.string(),
                    }),
                }),
                404: z.object({
                    message: z.string(),
                }),
            }
        }
    }, async (request, reply) => {
        const { attendeeId } = request.params;

        // Fetch attendee details
        const attendee = await prisma.attendee.findUnique({
            select: {
                name: true,
                email: true,
                event: {
                    select: {
                        title: true,
                    },
                },
            },
            where: {
                id: attendeeId,
            },
        });

        if (!attendee) {
            reply.status(404);
            return { message: "Attendee not found" };
        }

        const baseURL = `${request.protocol}://${request.hostname}`
        const checkingURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);

        return reply.send({ 
            badge: {
                name: attendee.name,
                email: attendee.email,
                event: attendee.event.title,
                checkingURL: checkingURL.toString(),
            },
        });
    });
}