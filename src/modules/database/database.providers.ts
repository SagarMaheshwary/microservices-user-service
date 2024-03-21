import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DATA_SOURCE, POSTGRES } from '../../constants/database';
import { User } from '../user/user.entity';
import { Logger } from './logger';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: POSTGRES,
        host: configService.get('database.host'),
        database: configService.get('database.database'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        port: configService.get('database.port'),
        schema: configService.get('database.schema'),
        entities: [User],
        logger: new Logger(Boolean(configService.get('database.logging'))),
      });

      return dataSource.initialize();
    },
  },
];
