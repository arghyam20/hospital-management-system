import { Controller, Post, Body, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrderTestDto, SubmitResultDto } from '../../../../packages/shared-dto/src/laboratory.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Laboratory')
@ApiBearerAuth()
@Controller('laboratory')
export class LaboratoryController implements OnModuleInit {
  constructor(
    @Inject('LABORATORY_SERVICE') private readonly laboratoryClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.laboratoryClient.subscribeToResponseOf('laboratory.orderTest');
    this.laboratoryClient.subscribeToResponseOf('laboratory.submitResult');
    this.laboratoryClient.subscribeToResponseOf('laboratory.getByPatientId');
    await this.laboratoryClient.connect();
  }

  @Post('order')
  @ApiOperation({ summary: 'Order a lab test' })
  @ApiResponse({ status: 201, description: 'Test ordered' })
  async orderTest(@Body() orderDto: OrderTestDto) {
    return firstValueFrom(this.laboratoryClient.send('laboratory.orderTest', orderDto));
  }

  @Post('result')
  @ApiOperation({ summary: 'Submit a lab result' })
  @ApiResponse({ status: 201, description: 'Result submitted' })
  async submitResult(@Body() resultDto: SubmitResultDto) {
    return firstValueFrom(this.laboratoryClient.send('laboratory.submitResult', resultDto));
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get lab tests for a patient' })
  async getTestsByPatient(@Param('patientId') patientId: string) {
    return firstValueFrom(this.laboratoryClient.send('laboratory.getByPatientId', { patientId }));
  }
}
