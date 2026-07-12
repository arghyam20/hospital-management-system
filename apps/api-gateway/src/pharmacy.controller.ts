import { Controller, Post, Body, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DispensePrescriptionDto } from '../../../../packages/shared-dto/src/pharmacy.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Pharmacy')
@ApiBearerAuth()
@Controller('pharmacy')
export class PharmacyController implements OnModuleInit {
  constructor(
    @Inject('PHARMACY_SERVICE') private readonly pharmacyClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.pharmacyClient.subscribeToResponseOf('pharmacy.dispense');
    this.pharmacyClient.subscribeToResponseOf('pharmacy.getInventory');
    await this.pharmacyClient.connect();
  }

  @Post('dispense')
  @ApiOperation({ summary: 'Dispense a prescription' })
  @ApiResponse({ status: 201, description: 'Prescription dispensed' })
  async dispensePrescription(@Body() dispenseDto: DispensePrescriptionDto) {
    return firstValueFrom(this.pharmacyClient.send('pharmacy.dispense', dispenseDto));
  }

  @Get('inventory')
  @ApiOperation({ summary: 'Get current pharmacy inventory' })
  async getInventory() {
    return firstValueFrom(this.pharmacyClient.send('pharmacy.getInventory', {}));
  }
}
