import type { Prisma, Gym,  } from "@prisma/client";
import type { GymsRepository } from "../gym-repository";

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = [];

    async findById(id: string) {
        const gym = this.items.find((gym) => gym.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }

}