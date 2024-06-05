import { Gender } from "../models/gender";
import { Status } from "../models/status";

export class RetrieveCharactersDto {
    filterLocation?: number;
    filterGender?: Gender;
    filterStatus?: Status;
    sortAscending?: boolean;
    sortByName?: boolean;
    sortByGender?: boolean;
}