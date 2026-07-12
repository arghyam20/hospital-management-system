import { Module, DynamicModule, Global } from '@nestjs/common';
import { ClientsModule, Transport, ClientsModuleOptions } from '@nestjs/microservices';

@Global()
@Module({})
export class SharedKafkaModule {
  static register(name: string, clientId: string, brokers: string[] = ['localhost:29092']): DynamicModule {
    return {
      module: SharedKafkaModule,
      imports: [
        ClientsModule.register([
          {
            name,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId,
                brokers,
              },
              consumer: {
                groupId: `${clientId}-consumer`,
              },
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
