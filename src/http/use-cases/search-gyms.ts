import type { Gym } from "@prisma/client";
import type { GymsRepository } from "../repositories/gym-repository";

interface SearchGymsUseCaseRequest {
   query: string;
   page: number;
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[];
}

export class SearchGymsUseCase {
    constructor(private gymsRepository: GymsRepository){ }

    async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {

        const gyms = await this.gymsRepository.searchManyByTitle(query, page);

        return { gyms };

    }
}

