import { Gender } from "../models/gender";
import { Status } from "../models/status";

export class CreateCharacterDto {
    firstName: string;
    lastName: string;
    status: Status;
    stateOfOrigin?: string;
    gender: Gender;
    locationId?: number;
    episodeIds?: number[];
}
