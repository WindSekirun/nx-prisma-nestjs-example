import { ApiProperty } from "@nestjs/swagger";

export class LogContent {
  @ApiProperty({ type: String })
  log: string;
}
