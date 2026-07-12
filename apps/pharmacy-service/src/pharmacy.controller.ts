import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PharmacyService } from './pharmacy.service';
import { DispensePrescriptionDto } from '../../../../packages/shared-dto/src/pharmacy.dto';

@Controller()
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @MessagePattern('pharmacy.dispense')
  async dispensePrescription(@Payload() dispenseDto: DispensePrescriptionDto) {
    return this.pharmacyService.dispensePrescription(dispenseDto);
  }

  @MessagePattern('pharmacy.getInventory')
  async getInventory() {
    return this.pharmacyService.getInventory();
  }
}
