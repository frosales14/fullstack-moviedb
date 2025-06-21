import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ActorController],
  providers: [ActorService],
  imports: [TypeOrmModule.forFeature([Actor]), AuthModule],
})
export class ActorModule {}
