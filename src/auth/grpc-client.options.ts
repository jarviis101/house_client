import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const GrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, './auth.proto'),
    url: '0.0.0.0:8080', //TODO get from config
  },
};
