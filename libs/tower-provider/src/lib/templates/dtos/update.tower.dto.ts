import { PartialType } from "@nestjs/mapped-types";
import { CreateTowerDTO } from "./create.tower.dto";

export class UpdateTowerDTO extends PartialType(CreateTowerDTO) {}