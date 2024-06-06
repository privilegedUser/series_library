import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
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

    const duplicateLocation = await this.locationRepository
      .findOne({ where: { latitude: location.latitude, longitude: location.longitude } });
    
    if (duplicateLocation)
      throw new BadRequestException("Duplicate location.");
    
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
}
