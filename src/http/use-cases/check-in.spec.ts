import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;


describe("Check-in Use Case", () => {

    beforeEach(() => {
         checkInsRepository = new InMemoryCheckInsRepository();
         gymsRepository = new InMemoryGymsRepository();
         sut = new CheckInUseCase(checkInsRepository, gymsRepository);

         gymsRepository.items.push({
            id: "gym-01",
            title: "Gym 01",
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0
        });

         vi.useFakeTimers();
    });


    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0
        });

        expect(checkIn.id).toEqual(expect.any(String))
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0
        });

        await expect(sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(Error)
    });

    it("should not be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0
        });
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    });
});
