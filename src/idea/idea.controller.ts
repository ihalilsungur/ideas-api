import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('idea')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}
  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Get(':id')
  ideaById(@Param('id') id: string) {
    return this.ideaService.ideaById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createIdea(@Body() data: IdeaDTO) {
    return this.ideaService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  removeIdea(@Param('id') id: string) {
    return this.ideaService.delete(id);
  }
}
