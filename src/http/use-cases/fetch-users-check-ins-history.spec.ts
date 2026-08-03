import { expect, describe, it, beforeEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { FetchUsersCheckInsHistoryUseCase } from "./fetch-users-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUsersCheckInsHistoryUseCase;


describe("Fetch User Check-in History Use Case", () => {

    beforeEach(async () => {
         checkInsRepository = new InMemoryCheckInsRepository();

         sut = new FetchUsersCheckInsHistoryUseCase(checkInsRepository)
    });

 
    it("should be able to fetch check-in history", async () => {
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

        const { checkIns } = await sut.execute({
            userId: "user-01",
            page: 1,
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "gym-01" }),
            expect.objectContaining({ gym_id: "gym-02" }),
        ]);
    });

    it("should be able to fetch paginated check-in history", async () => {
      
    for (let i = 1; i <= 22; i++) {
        await checkInsRepository.create({
            id: `check-in-${i}`,
            user_id: "user-01",
            gym_id: `gym-${i}`,
            created_at: new Date(),
        });
    }

    const { checkIns } = await sut.execute({
        userId: "user-01",
        page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
        expect.objectContaining({ gym_id: "gym-21" }),
        expect.objectContaining({ gym_id: "gym-22" }),
    ]);
});
});