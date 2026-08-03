import { expect, describe, it, beforeEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { GetUsersMetricsUseCase } from "./get-users-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUsersMetricsUseCase;


describe("Get User Metrics Use Case", () => {

    beforeEach(async () => {
         checkInsRepository = new InMemoryCheckInsRepository();

         sut = new GetUsersMetricsUseCase(checkInsRepository)
    });

 
    it("should be able to get checkins count from metrics", async () => {
        await checkInsRepository.create({
                id: "check-in-01",
                user_id: "user-01",
                gym_id: "gym-01",
                created_at: new Date(),
        });

        await checkInsRepository.create({
            id: "check-in-02",
            user_id: "user-01",
            gym_id: "gym-02",
            created_at: new Date(),
        });

        const { checkInsCount } = await sut.execute({
            userId: "user-01",
        });

        expect(checkInsCount).toEqual(2);
    });

   
});