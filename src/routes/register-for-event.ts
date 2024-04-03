import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function registeForEvent(app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .post("/events/:eventId/attendees",
    {
        schema:{
            params: z.object({
                eventId: z.string().uuid()
            }),
            body: z.object({
                name: z.string().min(3).max(255),
                email: z.string().email(),
            }),
            response:{
                201: z.object({
                    attendeeId: z.number().int(),
                })
            }
        }
    }
    ,async (request,reply)=>{
        const {eventId} = request.params;
        const {name,email} = request.body;

        // Check if attendee already exists
        const existingAttendee = await prisma.attendee.findUnique({
            where:{
                eventId_email:{
                    email,
                    eventId
                }
            }
        });

        if(existingAttendee){
            throw new Error("Attendee already registered for this event");
        }

        const [event, eventAttendeesCount] = await Promise.all([
            prisma.event.findUnique({
                where:{
                    id: eventId
                }
            }),
            prisma.attendee.count({
                where:{
                    eventId
                }
            })
        
        ])

        if(!event){
            throw new Error("Event not found");
        }

        if(event?.maxAttendees && eventAttendeesCount >= event.maxAttendees){
            throw new Error("It's not possible to register for this event. The maximum number of attendees has been reached");
        }

        // Register the attendee
       const attendee =  await prisma.attendee.create({
            data:{
                name,
                email,
                eventId,
            }
        });

        return reply.code(201).send({attendeeId: attendee.id});
    })
}