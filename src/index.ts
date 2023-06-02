import dotenv from 'dotenv';
import server from './server';

dotenv.config();

server.listen(process.env.PORT_SERVER, () => {
  console.log('%s listening at %s', server.name, server.url);
});
