import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto/index';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with ID ${id} not found.`);

    return car;
  }

  createCar(createCarDTO: CreateCarDTO) {
    const car: Car = {
      id: uuid(),
      ...createCarDTO,
    };

    this.cars.push(car);

    return car;
  }

  updateCar(id: string, updateCarDto: UpdateCarDTO) {
    let carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException('Car ID inside the body is not valid.');
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }

      return car;
    });

    return carDB; // carro actualizado
  }

  deleteCar(id: string) {
    this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
