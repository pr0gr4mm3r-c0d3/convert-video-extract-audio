import { spawn } from 'child_process';
import { Request, Response, Next, RequestHandler } from 'restify';

export const convertMp4ToWebm: RequestHandler = (
  req: Request,
  res: Response,
  next: Next
) => {
  const { input, output } = req.body;

  const ffmpeg = spawn('ffmpeg', [
    '-i',
    input,
    '-c:v',
    'libvpx',
    '-crf',
    '10',
    '-b:v',
    '1M',
    '-c:a',
    'libvorbis',
    '-f',
    'webm',
    output,
  ]);

  ffmpeg.on('close', (code) => {
    console.log(code);
    code === 0
      ? res.send(200, 'Video transformed successfully')
      : res.send(500, 'Error transforming video');
    next();
  });
};
