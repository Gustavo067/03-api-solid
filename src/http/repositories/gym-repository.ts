import { Prisma, type Gym} from "@prisma/client";


export interface FetchNearbyGymsParams {
    latitude: number;
    longitude: number;
}
export interface GymsRepository {
    findById(id: string): Promise<Gym | null>;
    searchManyByTitle(query: string, page: number): Promise<Gym[]>;
    fetchNearbyGyms(params: FetchNearbyGymsParams): Promise<Gym[]>;
    create(data: Prisma.GymCreateInput): Promise<Gym>;
}