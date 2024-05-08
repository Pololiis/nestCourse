import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto/index';

@Controller('cars')
// @UsePipes(ValidationPipe) a nivel de controlador.
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  // Se puede utilizar new ParseUUIDPipe({ version: '5' }) si necesitamos que sea de una versión en específico.
  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id);
  }

  @Post()
  // @UsePipes(ValidationPipe) a nivel de método.
  createCar(@Body() createCarDto: CreateCarDTO) {
    return this.carsService.createCar(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDTO,
  ) {
    return this.carsService.updateCar(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id);
  }
}
