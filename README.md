<p align="center">
  <img alt="Logo NLW Expert - Rocketseat" src="src/assets/nwl-united-icon.svg" width="100x" />
</p>

<p align="center">
This application was developed in the NLW Unite from Rocketseat on the Nodejs track.
</p>

<p align="center">
  <a href="#-tecnologies">Tecnologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-deploy">Deploy</a>

</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=F48F56&labelColor=00292E">
</p>

<br>

<p align="center"
    style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="Gif of the application" src="https://github.com/tatacsd/pass-in-web/assets/29147847/25253e1d-390e-4b7b-b7c6-07ece8b3d019" width="50%">
  <img alt="Gif of the application" src="https://github.com/tatacsd/pass-in-web/assets/29147847/96cadb8c-f735-4c12-8c4c-dc7b2edff2de" width="50%">


</p>


## 🚀 Tecnologies

This project was developed using the following technologies:
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Fastify](https://www.fastify.io/)
- [Zod](https://zod.dev/)
- [Faker.js](https://fakerjs.dev/guide/)
- [Swagger](https://swagger.io/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)


## 💻 Project
The project goal was to develop a complete application using REST API to be used by the front-end application developed in the same event using React.js.

You can access the front-end application [here](https://pass-in-web-qwwz.vercel.app/).
And the backend application [here](https://pass-in-backend-node.onrender.com/docs/static/index.html#/events/post_events).


The application is a tool for managing event participants in person. Its functionality includes:
- Creating endpoints for the manager to create new events.
- Creating endpoints to get attendees badges.
- Creating endpoints to get attendees from the event.
- Creating endpoints to check-in attendees.
- Creating endpoints to register attendees.

### 📚 What I've learned with this project
- How to use Swagger and Swagger UI to document the API.
- How to use Zod to validate the data.
- How to use Faker.js to generate fake data while testing.
- How to use Prisma to interact with the database locally.
- How to use Fastify to create the server.

## :sparkles: Features
- [x] Create new events
- [x] Get attendees badges
- [x] Get attendees from the event
- [x] Check-in attendees
- [x] Register attendees


##  :boom: Extra features added after the event


## Requeriments
- [x] The manager must have the ability to add new events.
- [x] The manager should be able to view event details.
- [x] The manager needs access to a list of event participants.
- [x] Attendees should be able to register for events.
- [x] Attendees should have access to their enrollment credentials.
- [x] Attendees must be able to check in at the event.

### Business Rules

- [x] Attendees may only register for one event at a time.
- [x] Registration is subject to availability.
- [x] Attendees can only check in once at the event.

### Non functional requirment
- [ ] Check-in process must utilize QR codes.


## 🛠 How to run
1. Clone this repository
2. Install the dependencies with `npm install`
3. Start the server with `npm run dev`
4. The server will start at `http://localhost:3333`

## 🚀 Deploy 
The application was deployed on Render, you can access it [here](https://pass-in-backend-node.onrender.com/docs/static/index.html#/events/post_events)

