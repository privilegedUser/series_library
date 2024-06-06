import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const newComment = this.commentRepository.create(createCommentDto);

    const duplicateComment = await this.commentRepository
      .findOne({ where: { comment: newComment.comment, ipAddressLocation: newComment.ipAddressLocation } });
    
    if (duplicateComment)
      throw new BadRequestException("Duplicate comment.");

    return await this.commentRepository.save(newComment);
  }

  async findAll() {
    return await this.commentRepository.find({
      order: { createdAt: "DESC" }
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id }
    });

    if (!comment)
      throw new NotFoundException(`Comment with id: ${id} not found.`);

    return location;
  }
}
