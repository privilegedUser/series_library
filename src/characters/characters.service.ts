import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Episode } from 'src/episodes/entities/episode.entity';
import { RetrieveCharactersDto } from './dto/retrieve-characters.dto';

@Injectable()
export class CharactersService {
  constructor(  
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>
  ) { }

  async create(createCharacterDto: CreateCharacterDto) {
    var character = this.characterRepository.create(createCharacterDto);

    if (createCharacterDto.episodeIds)
      character.episodes = createCharacterDto.episodeIds.map(id => ({
        ...new Episode(), id
      }))

    return await this.characterRepository.save(character);
  }

  async findAll(retrieveCharactersDto?: RetrieveCharactersDto) {

    return await this.characterRepository.find({
      relations: {
        location: true,
        episodes: true
      }
    });
  }

  async findOne(id: number) {
    return await this.characterRepository.findOne({
      where: { id },
      relations: {
        location: true,
        episodes: true
      }
    });
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
