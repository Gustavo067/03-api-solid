import type { Prisma, Gym,  } from "@prisma/client";
import type { GymsRepository } from "../gym-repository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/client";


export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = [];

    async findById(id: string) {
        const gym = this.items.find((gym) => gym.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Decimal(data.latitude?.toString() ?? '0'),
            longitude: new Decimal(data.longitude?.toString() ?? '0'),
            created_at: new Date()
        };

        this.items.push(gym);

        return gym;
    }

    async searchManyByTitle(query: string, page: number) {
        return this.items.filter((gym) => gym.title.includes(query)).slice((page - 1) * 20, page * 20);
    }
}