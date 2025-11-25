import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { QrService } from './qr.service';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get()
  async generate(@Query('nationalCode') nationalCode: string, @Res() res:Response) {
        if (!nationalCode) return res.status(400).send('لطفاً پارامتر text را وارد کنید.');
        const text = `${process.env.FRONTEND_URL}/search?q=${nationalCode}`;

        const dataUrl = await this.qrService.toDataUrl(text);
        const base64 = dataUrl.split(',')[1];
        const buffer = Buffer.from(base64, 'base64');

        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    }
//   @Get()
//   async generate(@Query('text') text: string, @Res() res:Response) {
//         if (!text) return res.status(400).send('لطفاً پارامتر text را وارد کنید.');
//         const dataUrl = await this.qrService.toDataUrl(text);
//         const base64 = dataUrl.split(',')[1];
//         const buffer = Buffer.from(base64, 'base64');
//         res.setHeader('Content-Type', 'image/png');
//         res.send(buffer);
//     }
}

