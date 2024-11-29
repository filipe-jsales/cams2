import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMosaicDto } from './dto/create-mosaic.dto';
import { UpdateMosaicDto } from './dto/update-mosaic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mosaic } from './entities/mosaic.entity';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { Cam } from 'src/cams/entities/cam.entity';

@Injectable()
export class MosaicsService {
  private readonly logger = new Logger(MosaicsService.name);

  constructor(
    @InjectRepository(Mosaic)
    private mosaicRepository: Repository<Mosaic>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Cam)
    private camRepository: Repository<Cam>,
  ) {}

  async create(createMosaicDto: CreateMosaicDto): Promise<Mosaic> {
    const { type, name, capacity, cameras, users, isActive } = createMosaicDto;

    this.logger.log(
      `Attempting to create a new mosaic with data: ${JSON.stringify(createMosaicDto)}`,
    );

    const mosaic = new Mosaic();
    mosaic.type = type;
    mosaic.name = name;
    mosaic.capacity = capacity;
    mosaic.isActive = isActive ?? true;

    if (cameras && cameras.length > 0) {
      mosaic.cameras = await this.camRepository.findBy({ id: In(cameras) });
    }

    if (users && users.length > 0) {
      mosaic.users = await this.userRepository.findBy({ id: In(users) });
    }

    return await this.mosaicRepository.save(mosaic);
  }

  async findAll(): Promise<any[]> {
    const mosaics = await this.mosaicRepository
      .createQueryBuilder('mosaic')
      .leftJoinAndSelect('mosaic.cameras', 'camera')
      .leftJoinAndSelect('mosaic.users', 'user')
      .loadRelationCountAndMap('mosaic.cameraCount', 'mosaic.cameras')
      .loadRelationCountAndMap('mosaic.userCount', 'mosaic.users')
      .getMany();

    return mosaics;
  }

  async findOne(id: number): Promise<Mosaic> {
    const mosaic = await this.mosaicRepository.findOne({
      where: { id },
      relations: ['cameras', 'users'],
    });
    if (!mosaic) {
      this.logger.error(`Mosaic with ID ${id} not found`);
      throw new NotFoundException(`Mosaic with ID ${id} not found`);
    }
    return mosaic;
  }

  async update(id: number, updateMosaicDto: UpdateMosaicDto): Promise<Mosaic> {
    const mosaic = await this.findOne(id);
    const { type, name, capacity, cameras, users, isActive } = updateMosaicDto;

    if (type) mosaic.type = type;
    if (name) mosaic.name = name;
    if (capacity) mosaic.capacity = capacity;
    if (isActive !== undefined) mosaic.isActive = isActive;

    if (cameras && cameras.length > 0) {
      mosaic.cameras = await this.camRepository.findBy({ id: In(cameras) });
    }

    if (users && users.length > 0) {
      mosaic.users = await this.userRepository.findBy({ id: In(users) });
    }

    return await this.mosaicRepository.save(mosaic);
  }

  async remove(id: number) {
    const updatedResult = await this.mosaicRepository.softDelete(id);
    if (!updatedResult.affected) {
      this.logger.error(`Mosaic with ID ${id} not found`);
      throw new NotFoundException(`Mosaic with ID ${id} not found`);
    }
    this.logger.log(`Mosaic with ID ${id} deleted`);
    return { deleted: true };
  }
}
