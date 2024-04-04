import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createEvents } from "./routes/create-event";
import { registeForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIns } from "./routes/check-ins";
import { getEventAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler";


const app = fastify();

// Add swagger documentation to the app
app.register(fastifySwagger, {
 swagger: {
  consumes: ["application/json"], // All data sent to the server is in JSON format
  produces: ["application/json"], // All data sent from the server is in JSON format
  info: {
    title: "Pass.in Event Management API",
    description: "Specifications for the Pass.in Event Management API endpoints consumed by the Pass.in web and mobile applications.",
    version: "1.0.0",
  },
 },
 // 
 transform: jsonSchemaTransform, // it will make swagger understand that i am using zod for validation, and it will generate the schema accordingly for each route
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs", // The URL to access the Swagger UI
  
});

// Add schema validation and serialization to the app
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createEvents);
app.register(registeForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIns);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server is running! https://localhost:3333");
});
