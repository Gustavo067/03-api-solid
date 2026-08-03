import type { Gym } from "@prisma/client";
import type { GymsRepository } from "../repositories/gym-repository";

interface FetchNearbyGymsUseCaseRequest {
   userLatitude: number;
   userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
    constructor(private gymsRepository: GymsRepository){ }

    async execute({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {

        const gyms = await this.gymsRepository.fetchNearbyGyms({
            latitude: userLatitude,
            longitude: userLongitude
        });

        return { gyms };    

    }
}

