import * as bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    try {

        prisma.$transaction([
            prisma.userRole.deleteMany(),
            prisma.userRole.createMany({
                data: [
              { id: 1, name: 'Admin'},
              { id: 2, name: 'Venue Owner'},
              { id: 3, name: 'Registered Visitor'},
            ]}),
        ]);

        const user1 = await prisma.user.upsert({
            where: { email: 'admin@wg.test' },
            update: {},
            create: {
                email: 'admin@wg.test',
                firstName: 'Admin',
                password: await bcrypt.hash('admin_pass', 10),
                role: 1
            },
        });

        const user2 = await prisma.user.upsert({
            where: { email: 'venue-owner@wg.test' },
            update: {},
            create: {
                email: 'venue-owner@wg.test',
                firstName: 'Venue',
                lastName: 'Owner',
                password: await bcrypt.hash('venue_pass', 10),
                role: 2
            },
        });
        
        const user3 = await prisma.user.upsert({
            where: { email: 'registered-visitor@wg.test' },
            update: {},
            create: {
                email: 'registered-visitor@wg.test',
                firstName: 'Registered',
                lastName: 'Visitor',
                password: await bcrypt.hash('visitor_pass', 10),
                role: 3
            },
        });        
    }
    catch (error) {
        throw error;
    }
}

main().catch((err) => {
    console.warn("Error While generating Seed: \n", err);
});