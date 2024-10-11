import { User } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @Expose({ groups: ['admin'] })
    id: bigint;

    @Expose({ groups: ['me', 'admin'] })
    email: string;

    firstName: string | null;

    lastName: string | null;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    password: string;

    @Expose({ groups: ['me', 'admin'] })
    role: number;
}