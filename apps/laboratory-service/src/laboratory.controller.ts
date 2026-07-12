import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LaboratoryService } from './laboratory.service';
import { OrderTestDto, SubmitResultDto } from '../../../../packages/shared-dto/src/laboratory.dto';

@Controller()
export class LaboratoryController {
  constructor(private readonly laboratoryService: LaboratoryService) {}

  @MessagePattern('laboratory.orderTest')
  async orderTest(@Payload() orderDto: OrderTestDto) {
    return this.laboratoryService.orderTest(orderDto);
  }

  @MessagePattern('laboratory.submitResult')
  async submitResult(@Payload() resultDto: SubmitResultDto) {
    return this.laboratoryService.submitResult(resultDto);
  }

  @MessagePattern('laboratory.getByPatientId')
  async getByPatientId(@Payload() data: { patientId: string }) {
    return this.laboratoryService.getPatientTests(data.patientId);
  }
}
