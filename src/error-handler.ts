import { FastifyInstance } from "fastify";
import { BadRequest } from "./routes/_errors/bad-request";
import { NotFound } from "./routes/_errors/not-found";
import { Conflict } from "./routes/_errors/conflict";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = async (
  error,
  request,
  reply
) => {

    if(error instanceof ZodError) {
        return reply.status(300).send({ 
            message: "Error validating request",
            errors: error.flatten().fieldErrors
            

        });

    }


    if (error instanceof BadRequest) {
      return reply.status(400).send({ message: error.message });
    } else if (error instanceof NotFound) {
      return reply.status(404).send({ message: error.message });
    } else if (error instanceof Conflict) {
      return reply.status(409).send({ message: error.message });
    } else {
      return reply.status(500).send({ message: "Internal server error" });
    }
  
};
