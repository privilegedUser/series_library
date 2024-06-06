import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
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

  async findAllForCharacter(characterId: number) {
    return this.episodeRepository
      .createQueryBuilder("episode")
      .getMany();
  }

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
