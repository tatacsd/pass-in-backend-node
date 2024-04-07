import { prisma } from "../src/lib/prisma"
import { faker } from '@faker-js/faker';

const attendees = Array.from({ length: 100 }).map(() => {
    return {
        id: faker.number.int({ min: 10000, max: 20000 }),
        name: faker.person.fullName(),
        email: faker.internet.email().toLocaleLowerCase(),
        createdAt: faker.date.recent(),
        checkedInAt: faker.date.recent(),
        eventId: "d97443ca-71ff-4e22-93b0-2c0fe0981b51",
    };
});

async function seed() {
    
    await prisma.event.create({
        data: {
            id: "d97443ca-71ff-4e22-93b0-2c0fe0981b51",
           title: "GraphQL Vancouver Meetup",
           slug: "graphql-vancouver-meetup",
           details: "Join us for a fun evening of talks and networking with the GraphQL community in Vancouver.",
           
        },
    });
    for (const attendee of attendees) {
        await prisma.attendee.create({
            data: {
                id: attendee.id,
                name: attendee.name,
                email: attendee.email,
                createdAt: attendee.createdAt,
                eventId: attendee.eventId,
            }
        });
    }
}


seed().then(() => {
    console.log("Seed complete");
    prisma.$disconnect();
    }).catch((e) => {
    console.error(e);
    }
);