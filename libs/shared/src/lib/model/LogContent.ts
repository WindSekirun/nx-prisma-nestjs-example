import { ApiProperty } from "@nestjs/swagger";

export class ReqLogContent {
  @ApiProperty({ type: String })
  log: string;
}
