import { prisma } from "../src/lib/prisma"

async function seed() {
    
    await prisma.event.create({
        data: {
            id: "a1b2c3d4-e5f6-g7h8-i6j0-k1l2t9n4o3p6",
           title: "GraphQL Vancouver Meetup",
           details: "Join us for a fun evening of talks and networking with the GraphQL community in Vancouver.",
           maxAttendees: 30,
           slug: "graphql-vancouver-meetup",
           
        },
    });
}


seed().then(() => {
    console.log("Seed complete");
    prisma.$disconnect();
    }).catch((e) => {
    console.error(e);
    }
);