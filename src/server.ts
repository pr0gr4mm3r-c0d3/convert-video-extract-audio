import restify from 'restify';
import { convertMp4ToWebm, convertWebmToMp4, muteVideos } from './controllers';

const server = restify.createServer();

server.post('/api/v1/transform/mp4towebm', convertMp4ToWebm);
server.post('/api/v1/transform/webmtomp4', convertWebmToMp4);
server.post('/api/v1/transform/mutevideos', muteVideos);

export default server;
