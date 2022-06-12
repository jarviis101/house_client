import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { GrpcClientOptions } from './grpc-client.options';

@Module({
  imports: [],
  providers: [
    {
      provide: 'AUTH_PACKAGE',
      useFactory: () => {
        return ClientProxyFactory.create(GrpcClientOptions);
      },
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
