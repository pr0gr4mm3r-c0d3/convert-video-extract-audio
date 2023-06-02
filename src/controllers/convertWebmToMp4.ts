import { spawn } from 'child_process';
import { Request, Response, Next, RequestHandler } from 'restify';

export const convertWebmToMp4: RequestHandler = (
  req: Request,
  res: Response,
  next: Next
) => {
  const { input, output } = req.body;

  const ffmpeg = spawn('ffmpeg', [
    '-i',
    input,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '22',
    '-c:a',
    'copy',
    '-movflags',
    '+faststart',
    output,
  ]);

  ffmpeg.on('close', (code) => {
    code === 0
      ? res.send(200, 'Video transformed successfully')
      : res.send(500, 'Error transforming video');
    next();
  });
};
