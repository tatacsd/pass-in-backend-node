import {
  getEvent
} from "./chunk-5DNVXVPB.mjs";
import {
  registeForEvent
} from "./chunk-IRQHHB2N.mjs";
import {
  errorHandler
} from "./chunk-UU2KBHPA.mjs";
import "./chunk-C7TRTTDH.mjs";
import {
  checkIns
} from "./chunk-2J7YERWP.mjs";
import {
  createEvents
} from "./chunk-7PDR4NAI.mjs";
import "./chunk-IGN54WQQ.mjs";
import "./chunk-PAYBZHHE.mjs";
import {
  getAttendeeBadge
} from "./chunk-QY4VRRYU.mjs";
import {
  getEventAttendees
} from "./chunk-YOYPIAAD.mjs";
import "./chunk-NS4G56TP.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
  // Allow all origins
  // origin: ["http://localhost:3000"], // Allow only the specified origin
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    // All data sent to the server is in JSON format
    produces: ["application/json"],
    // All data sent from the server is in JSON format
    info: {
      title: "Pass.in Event Management API",
      description: "Specifications for the Pass.in Event Management API endpoints consumed by the Pass.in web and mobile applications.",
      version: "1.0.0"
    }
  },
  //
  transform: jsonSchemaTransform
  // it will make swagger understand that i am using zod for validation, and it will generate the schema accordingly for each route
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
  // The URL to access the Swagger UI
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvents);
app.register(registeForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIns);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server is running! https://localhost:3333");
});
