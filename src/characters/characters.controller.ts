import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { catchError } from 'rxjs';
import { LocationsService } from 'src/locations/locations.service';
import { RetrieveCharactersDto } from './dto/retrieve-characters.dto';

@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService
  ) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    const locationId = createCharacterDto.locationId;
    // if (locationId && !this.locationService.findOne(locationId))
    //   return "Something that says bad request;"

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
