import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createEvents } from "./routes/create-event";


const app = fastify();

// Add schema validation and serialization to the app
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createEvents);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server is running! https://localhost:3333");
});
