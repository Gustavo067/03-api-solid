import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "../repositories/check-ins-repository";
import type { GymsRepository } from "../repositories/gym-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinate";
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-checkins-error";
import { MaxDistanceError } from "./erros/max-distance-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {

  }

  async execute({checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    }
  }
}
