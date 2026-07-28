import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {

    beforeEach(() => {
         gymsRepository = new InMemoryGymsRepository();
         sut = new CreateGymUseCase(gymsRepository);
    });

    it("should be able to create a gym", async () => {
        const { gym } = await sut.execute({
            title: "Gym 1",
            description: null,
            phone: null,
            latitude: -27.5252601,
            longitude: -48.6358436
        });

        expect(gym.id).toEqual(expect.any(String))
    });

});