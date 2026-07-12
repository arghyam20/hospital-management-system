import { Controller, Post, Body, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePatientDto } from '../../../../packages/shared-dto/src/patient.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Patient')
@ApiBearerAuth()
@Controller('patient')
export class PatientController implements OnModuleInit {
  constructor(
    @Inject('PATIENT_SERVICE') private readonly patientClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.patientClient.subscribeToResponseOf('patient.create');
    this.patientClient.subscribeToResponseOf('patient.getByUserId');
    await this.patientClient.connect();
  }

  @Post()
  @ApiOperation({ summary: 'Create patient profile' })
  @ApiResponse({ status: 201, description: 'Patient created' })
  async createPatient(@Body() createPatientDto: CreatePatientDto) {
    return firstValueFrom(this.patientClient.send('patient.create', createPatientDto));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get patient profile by User ID' })
  @ApiResponse({ status: 200, description: 'Patient found' })
  async getPatientByUserId(@Param('userId') userId: string) {
    return firstValueFrom(this.patientClient.send('patient.getByUserId', { userId }));
  }
}
