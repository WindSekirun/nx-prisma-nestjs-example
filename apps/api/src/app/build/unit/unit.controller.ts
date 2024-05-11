import { Controller } from "@nestjs/common";
import { BuildUnitTestService } from "./unit.service";

@Controller()
export class BuildUnitTestController {
  constructor(private readonly buildUnitTestService: BuildUnitTestService) {}

}
