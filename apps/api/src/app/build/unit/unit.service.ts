import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BuildUnitTestService {
  constructor(private readonly prisma: PrismaService) {}
}
