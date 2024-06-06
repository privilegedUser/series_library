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
    private readonly EpisodeRepository: Repository<Episode>
  ) { }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const episode = this.EpisodeRepository.create(createEpisodeDto);

    return await this.EpisodeRepository.save(episode);
  }

  async findAll() {
    return await this.EpisodeRepository.find({
      relations: {
        characters: true,
        episodeComments: true
      }
    });
  }

  async findOne(id: number) {
    return await this.EpisodeRepository.findOne({
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
