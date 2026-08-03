import { expect, describe, it, beforeEach, vi } from "vitest";

import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";


let checkInsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;


describe("Fetch nearby gyms use case", () => {

    beforeEach(async () => {
         checkInsRepository = new InMemoryGymsRepository();

         sut = new FetchNearbyGymsUseCase(checkInsRepository)
    });

 
    it("should be able to fetch nearby gyms", async () => {
        await checkInsRepository.create({
            id: "gym-01",
            title: "Near Gym",
            description: null,
            phone: null,
            latitude: -27.2892852,
            longitude: -49.6401091
        });

        await checkInsRepository.create({
            id: "gym-02",
            title: "Far Gym",
            description: null,
            phone: null,
            latitude: -27.8618928,
            longitude: -49.5229501
        });

        const { gyms } = await sut.execute({
            userLatitude: -27.2892852,
            userLongitude: -49.6401091
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
    });
});