import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PatientService } from './patient.service';
import { CreatePatientDto } from '../../../../packages/shared-dto/src/patient.dto';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @MessagePattern('patient.create')
  async createPatient(@Payload() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @MessagePattern('patient.getByUserId')
  async getPatientByUserId(@Payload() data: { userId: string }) {
    return this.patientService.getPatientByUserId(data.userId);
  }
}
