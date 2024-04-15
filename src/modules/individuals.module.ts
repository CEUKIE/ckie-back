import { Module } from '@nestjs/common';

import { IndividualsService } from '../providers/individuals.service';
import { IndividualsRepository } from '../repositories/individuals.repository';
import { IndividualsPrismaRepository } from '../repositories/individuals.prisma.repository';
import { IndividualsController } from '../controllers/individuals.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from '../repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/users.prisma.repository';
import { SpeciesRepository } from '../repositories/species.repository';
import { SpeciesPrismaRepository } from '../repositories/species.prisma.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [IndividualsController],
  providers: [
    IndividualsService,
    { provide: IndividualsRepository, useClass: IndividualsPrismaRepository },
    { provide: UsersRepository, useClass: UsersPrismaRepository },
    { provide: SpeciesRepository, useClass: SpeciesPrismaRepository },
  ],
})
export class IndividualsModule {}
