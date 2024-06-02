import { Module } from '@nestjs/common';
import { RecordsService } from '../providers/records.service';
import { RecordsController } from '../controllers/records.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RecordsRepository } from '../repositories/records.repository';
import { RecordsPrismaRepository } from '../repositories/records.prisma.repository';
import { IndividualsRepository } from '../repositories/individuals.repository';
import { IndividualsPrismaRepository } from '../repositories/individuals.prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RecordsController],
  providers: [
    RecordsService,
    { provide: RecordsRepository, useClass: RecordsPrismaRepository },
    { provide: IndividualsRepository, useClass: IndividualsPrismaRepository },
  ],
})
export class RecordsModule {}
