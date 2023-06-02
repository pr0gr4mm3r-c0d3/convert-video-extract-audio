import { spawn } from 'child_process';
import { Request, Response, Next, RequestHandler } from 'restify';

export const muteVideos: RequestHandler = (
  req: Request,
  res: Response,
  next: Next
) => {
  const { inputWebm, inputMp4, outputWebm, outputMp4 } = req.body;

  const ffmpegWebm = spawn('ffmpeg', [
    '-i',
    inputWebm,
    '-c:v',
    'copy',
    '-an',
    outputWebm,
  ]);
  const ffmpegMp4 = spawn('ffmpeg', [
    '-i',
    inputMp4,
    '-c:v',
    'copy',
    '-an',
    outputMp4,
  ]);

  ffmpegWebm.on('close', (code) => {
    code === 0
      ? res.send(200, 'Video transformed successfully')
      : res.send(500, 'Error transforming video');
    next();
  });
  ffmpegMp4.on('close', (code) => {
    code === 0
      ? res.send(200, 'Video transformed successfully')
      : res.send(500, 'Error transforming video');
    next();
  });
};
