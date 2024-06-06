import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>
  ) { }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const episode = this.episodeRepository.create(createEpisodeDto);

    return await this.episodeRepository.save(episode);
  }

  async findAll() {
    return await this.episodeRepository.find({
      relations: {
        characters: true,
        episodeComments: true
      },
      order: {
        releaseDate: "ASC"
      }
    });
  }

  // async findAllForCharacter(characterId: number) {
  //   const query = this.episodeRepository
  //     .createQueryBuilder('episode')
  //     .leftJoinAndMapMany('character', 'character')
  //     .andWhere('character.id = :characterId', { characterId });


  // }

  async findOne(id: number) {
    return await this.episodeRepository.findOne({
      where: { id },
      relations: {
        characters: true,
        episodeComments: true
      }
    });
  }

  update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
