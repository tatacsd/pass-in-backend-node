import {
  Conflict
} from "./chunk-C7TRTTDH.mjs";
import {
  BadRequest
} from "./chunk-PAYBZHHE.mjs";
import {
  NotFound
} from "./chunk-NS4G56TP.mjs";

// src/error-handler.ts
import { ZodError } from "zod";
var errorHandler = async (error, request, reply) => {
  if (error instanceof ZodError) {
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

export {
  errorHandler
};
