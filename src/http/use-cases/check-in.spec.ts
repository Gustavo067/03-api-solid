import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/client";
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-checkins-error";
import { MaxDistanceError } from "./erros/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;


describe("Check-in Use Case", () => {

    beforeEach(async () => {
         checkInsRepository = new InMemoryCheckInsRepository();
         gymsRepository = new InMemoryGymsRepository();
         sut = new CheckInUseCase(checkInsRepository, gymsRepository);

       await gymsRepository.create({
        id: "gym-01",
        title: "Gym 01",
        description: null,
        phone: null,
        latitude: -27.5252601,
        longitude: -48.6358436,
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
            userLatitude: -27.5252601,
            userLongitude: -48.6358436
        });

        expect(checkIn.id).toEqual(expect.any(String))
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -27.5252601,
            userLongitude: -48.6358436
        });

        await expect(sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -27.5252601,
            userLongitude: -48.6358436
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    });

    it("should not be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -27.5252601,
            userLongitude: -48.6358436
        });
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
        const { checkIn } = await sut.execute({
            userId: "user-01",
            gymId: "gym-01",
            userLatitude: -27.5252601,
            userLongitude: -48.6358436
        })

        expect(checkIn.id).toEqual(expect.any(String))
    });


    it("should not be able to check in on distant gym", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        gymsRepository.items.push({
            id: "gym-02",
            title: "Gym 01",
            description: null,
            phone: null,
            latitude: new Decimal(-27.5214398),
            longitude: new Decimal(-48.6373503)
        });

       await expect(sut.execute({
            userId: "user-01",
            gymId: "gym-02",
            userLatitude: -27.5252601,
            userLongitude: -48.6358436
        })).rejects.toBeInstanceOf(MaxDistanceError)
    });
});