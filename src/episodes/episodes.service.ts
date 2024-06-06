import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>
  ) { }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const episode = this.episodeRepository.create(createEpisodeDto);

    const duplicateEpisode = await this.episodeRepository
      .findOne({ where: { episodeCode: episode.episodeCode } });
    
    if (duplicateEpisode)
      throw new BadRequestException("Duplicate episode.");

    return await this.episodeRepository.save(episode);
  }

  async findAll() {
    return this.episodeRepository
      .createQueryBuilder("episode")
      .leftJoinAndSelect("episode.characters", "characters")
      .leftJoinAndSelect("episode.episodeComments", "comments")
      .loadRelationCountAndMap("episode.commentCount", "episode.episodeComments", "comments")
      .select(["episode", "characters"])
      .orderBy('episode.release_date', "ASC")
      .getMany();
  }

  async findOne(id: number) {
    const episode = await this.episodeRepository.findOne({
      where: { id },
      relations: {
        characters: true,
        episodeComments: true
      }
    });

    if (!episode)
      throw new NotFoundException(`Episode with id: ${id} not found.`);

    return location;
  }
}
