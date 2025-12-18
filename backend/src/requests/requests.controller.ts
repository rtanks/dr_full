import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  //draft
  @Post('create-draft')
  async saveRequestDraft(@Body() body:{tempId:string, data:object}) {
    await this.requestsService.saveRequestDraft(body.tempId, body.data);
    return {message: 'draft saved!'};
  }
  @Post('delete-draft')
  async deleteDraft(@Body('userKey') userKey:string ) {
    return this.requestsService.deleteDraft(userKey);
  }
  @Get('get-draft/:userKey')
  async getDraft(@Param('userKey') userKey:string) {
    return await this.requestsService.getDraft(userKey)
  }
  // f1662973-e3d5-4a35-a568-b65c71c0b567
  //requests
  @Post('create')
  async createOtherRequest(@Body() createRequestDto: CreateRequestDto) {
    return await this.requestsService.createOtherRequest(createRequestDto);
  }
  @Post('admin/create')
  async createRequestAdmin(@Body('phoneNumber') phoneNumber:string ,@Body() body: {category:string, requestData:any}) {
    return await this.requestsService.createRequestAdmin(phoneNumber, body.category, body.requestData);
  }

  @Get('type/recovery')
  async getRecoveryRequests(){
    return await this.requestsService.getRequestsRecovery();
  }
  @Get('list')
  async findUserRequestWithServiceName(@Body() body: {userId: string, service:string}) {
    return this.requestsService.findUserRequestsByServiceName(body.userId, body.service);
  }
  @Get('last-request/:userId') 
  async lastRequest(@Param('userId') userId:string) {
    return await this.requestsService.lastRequest(userId)
  }

  @Get('user/:userId')
  // @UseGuards(JwtAuthGuard)
  async findUserRequests(@Param('userId') userId:string){
    return await this.requestsService.findUserRequests(userId);
  }


  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findRequest(@Param('id') id: string) {
    return await this.requestsService.findRequest(id);
  }

  @Patch(':id')
  async completeOrderLevelOne(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return await this.requestsService.completeOrderLevelOne(id, updateRequestDto);
  }
  @Patch('update/:id')
  async updateRequest(@Param('id') id: string, @Body('doctor') doctor:string) {
    return await this.requestsService.updateRequest(id, doctor);
  }
  @Patch('type/request-update/:id')
  async updateRequestType(@Param('id') id:string) {
    return await this.requestsService.updateRequestType(id);
  }

  @Delete('delete-request/:id')
  async remove(@Param('id') id: string) {
    return await this.requestsService.removeRequest(id);
  }
}
