import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Episode } from 'src/episodes/entities/episode.entity';
import { RetrieveCharactersDto } from './dto/retrieve-characters.dto';
import { Gender } from './models/gender';
import { Status } from './models/status';

@Injectable()
export class CharactersService {
  constructor(  
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>
  ) { }

  async create(createCharacterDto: CreateCharacterDto) {
    var character = this.characterRepository.create(createCharacterDto);

    if (!Object.values(Gender).includes(character.gender))
      throw new BadRequestException("Enter valid gender: 'MALE' | 'FEMALE'");

    if (!Object.values(Status).includes(character.status))
      throw new BadRequestException("Enter valid status: 'ALIVE' | 'DEAD' | 'UNKNOWN'");

    if (createCharacterDto.episodeIds)
      character.episodes = createCharacterDto.episodeIds.map(id => ({
        ...new Episode(), id
      }))

    return await this.characterRepository.save(character);
  }

  async findAll(retrieveCharactersDto: RetrieveCharactersDto) {
    const { filterLocation, filterGender, filterStatus, sortAscending, sortByName, sortByGender } = retrieveCharactersDto;

    const query = this.characterRepository.createQueryBuilder('character');

    filterLocation && query.andWhere('character.location.id = :location', { filterLocation });
    filterStatus && query.andWhere('character.status = :status', { filterStatus });
    filterGender && query.andWhere('character.gender = :gender', { filterGender });
    
    const sortOrder = sortAscending ? "ASC" : "DESC"

    sortByName && query.orderBy('character.firstName', sortOrder);
    sortByGender && query.addOrderBy('character.gender', sortOrder);


    return query
      .leftJoinAndSelect('character.location', 'locations')
      .leftJoinAndSelect('character.episodes', 'episodes')
      .getMany();
  }

  async findOne(id: number) {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: {
        location: true,
        episodes: true
      }
    });

    if (!character)
      throw new NotFoundException(`Character with id: ${id} not found.`);

    return character;
  }

  async findEpisodeFeatures(id: number) {
    return this.characterRepository.createQueryBuilder('character')
      .relation(Character, "episodes")
      .of(id)
      .loadMany();
  }
}
