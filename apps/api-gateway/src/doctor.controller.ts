import { Controller, Post, Body, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateDoctorDto } from '../../../../packages/shared-dto/src/doctor.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Doctor')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController implements OnModuleInit {
  constructor(
    @Inject('DOCTOR_SERVICE') private readonly doctorClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.doctorClient.subscribeToResponseOf('doctor.create');
    this.doctorClient.subscribeToResponseOf('doctor.getByUserId');
    this.doctorClient.subscribeToResponseOf('doctor.getAll');
    await this.doctorClient.connect();
  }

  @Post()
  @ApiOperation({ summary: 'Create doctor profile' })
  @ApiResponse({ status: 201, description: 'Doctor created' })
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return firstValueFrom(this.doctorClient.send('doctor.create', createDoctorDto));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get doctor profile by User ID' })
  @ApiResponse({ status: 200, description: 'Doctor found' })
  async getDoctorByUserId(@Param('userId') userId: string) {
    return firstValueFrom(this.doctorClient.send('doctor.getByUserId', { userId }));
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: 200, description: 'List of doctors' })
  async getAllDoctors() {
    return firstValueFrom(this.doctorClient.send('doctor.getAll', {}));
  }
}
