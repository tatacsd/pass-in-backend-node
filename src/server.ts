import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "./utils/generate-slig";

const app = fastify();

// Add schema validation and serialization to the app
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient({
  log: ["query"],
});

app
  .withTypeProvider<ZodTypeProvider>()
  .post("/events", {
    schema: {
      body: z.object({
        title: z.string().min(3).max(255),
        details: z.string().optional(),
        maxAttendees: z.number().int().positive().nullable(),
      }),
    response: {
        201: z.object({
            eventId: z.string().uuid(),
        }),
    },
    },
  },async (request, reply) => {

    const {
        title,
        details,
        maxAttendees,
    }= request.body;

    const slug = generateSlug(title);

    // Check if the slug already exists
    const existingSlug = await prisma.event.findFirst({
      where: {
        slug,
      },
    });

    if (existingSlug) {
      throw new Error("An event with this slug already exists");
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
  });

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server is running! https://localhost:3333");
});
