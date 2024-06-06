import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);

    return await this.commentRepository.save(comment);
  }

  async findAll() {
    return await this.commentRepository.find({
      order: { createdAt: "DESC" }
    });
  }

  async findOne(id: number) {
    return await this.commentRepository.findOne({
      where: { id }
    });
  }
}
