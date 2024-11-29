import { Injectable, Logger } from '@nestjs/common';
import { CreateCamDto } from './dto/create-cam.dto';
import { UpdateCamDto } from './dto/update-cam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cam } from './entities/cam.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CamsService {
  private readonly logger = new Logger(CamsService.name);
  constructor(
    @InjectRepository(Cam)
    private camsRepository: Repository<Cam>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCamDto: CreateCamDto) {
    const { userId, ...camData } = createCamDto;
    // @ts-expect-error wrong type for protocol
    const newCam = this.camsRepository.create(camData);
    this.logger.log(`Creating a new cam with data: ${JSON.stringify(newCam)}`);
    if (userId) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        this.logger.error(`User with ID ${userId} not found`);
        throw new Error(`User with ID ${userId} not found`);
      }
      newCam.user = user;
    }

    await this.camsRepository.save(newCam);
    return newCam;
  }
  async findAll() {
    const cams = await this.camsRepository.find();
    return cams;
  }

  async findOne(id: number) {
    const cam = await this.camsRepository.findOneBy({ id });
    return cam;
  }

  async update(id: number, updateCamDto: UpdateCamDto) {
    // @ts-expect-error wrong type for protocol
    await this.camsRepository.update(id, updateCamDto);
    const updatedCam = await this.camsRepository.findOneBy({ id });
    if (!updatedCam) {
      this.logger.error(`Cam with ID ${id} not found`);
      throw new Error(`Cam with ID ${id} not found`);
    }
    return updatedCam;
  }

  async remove(id: number) {
    const updateResult = await this.camsRepository.softDelete(id);
    if (!updateResult.affected) {
      this.logger.error(`Cam with ID ${id} not found`);
      throw new Error(`Cam with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
