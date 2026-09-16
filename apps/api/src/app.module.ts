// apps/api/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LeadsModule } from './modules/leads/leads.module';
import { CustomersModule } from './modules/customers/customers.module';
import { WhatsAppModule } from './modules/whatsapp/whatsapp.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CallsModule } from './modules/calls/calls.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { KnowledgeBaseModule } from './modules/knowledge-base/knowledge-base.module';
import { AIModule } from './modules/ai/ai.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditModule } from './modules/audit/audit.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PrismaService } from './common/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Feature modules
    AuthModule,
    UsersModule,
    LeadsModule,
    CustomersModule,
    WhatsAppModule,
    CampaignsModule,
    CallsModule,
    MeetingsModule,
    KnowledgeBaseModule,
    AIModule,
    NotificationsModule,
    AuditModule,
    ReportsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
