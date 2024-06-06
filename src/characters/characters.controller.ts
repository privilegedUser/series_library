import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { RetrieveCharactersDto } from './dto/retrieve-characters.dto';

@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService
  ) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll(@Query() query: RetrieveCharactersDto) {
    return this.charactersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Get(':id/episodes')
  findEpisodeFeatures(@Param('id') id: string) {
    return this.charactersService.findEpisodeFeatures(+id);
  }
}
