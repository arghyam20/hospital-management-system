import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from '../../../../packages/shared-dto/src/doctor.dto';

@Controller()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @MessagePattern('doctor.create')
  async createDoctor(@Payload() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @MessagePattern('doctor.getByUserId')
  async getDoctorByUserId(@Payload() data: { userId: string }) {
    return this.doctorService.getDoctorByUserId(data.userId);
  }

  @MessagePattern('doctor.getAll')
  async getAllDoctors() {
    return this.doctorService.getAllDoctors();
  }
}
