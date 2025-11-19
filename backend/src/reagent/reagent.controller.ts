import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { ReagentService } from './reagent.service';
import { CreateReagentDto } from './dto/create-reagent.dto';
import { UpdateReagentDto } from './dto/update-reagent.dto';
import { QrService } from 'src/qr/qr.service';
import type { Response } from 'express';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('reagent')
export class ReagentController {
  constructor(private readonly reagentService: ReagentService, private qrService:QrService) {}

  @Get('qr/:id')
  @UseGuards(JwtAuthGuard)
  async getQrCode(@Param('id') id:string, @Res() res:Response) {
    const user = await this.reagentService.findUser(id);
    
    const text = `${process.env.FRONTEND_URL}/${user.code}`;
    
    const dataUrl = await this.qrService.toDataUrl(text);
    const base64 = dataUrl.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
    return user;
  }  
}
