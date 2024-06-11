import {
  DynamicModule,
  Global,
  Logger,
  Module,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Global()
@Module({})
export class PrismaModule implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  static forRoot(seederEnabled: boolean): DynamicModule {
    Logger.debug(
      `Initializing PrismaModule as DynamicModule, seederEnabled: ${seederEnabled}`
    );
    const providers = [PrismaService];
    if (seederEnabled) {
      // providers.push(SomeSeeder);
      // TODO: add seeder
    }

    return {
      module: PrismaModule,
      providers,
      exports: [PrismaService],
    };
  }

  async onModuleInit() {
    // TODO: add seeder
    // if (this.seeders && this.seeders.length > 0) {
    //   for (const seeder of this.seeders) {
    //     await seeder.seed();
    //   }
    // }
  }
}
