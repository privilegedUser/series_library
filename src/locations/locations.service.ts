import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ) { }

  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    
    return await this.locationRepository.save(location);
  }

  async findAll() {
    return await this.locationRepository.find({
      relations: {
        characters: true
      }
    });
  }

  async findOne(id: number) {
    return await this.locationRepository.findOne({
      where: { id }
    });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
