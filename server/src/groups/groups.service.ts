import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { Cam } from 'src/cams/entities/cam.entity';

@Injectable()
export class GroupsService {
  private readonly logger = new Logger(GroupsService.name);
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    @InjectRepository(Cam)
    private camsRepository: Repository<Cam>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupsRepository.create(createGroupDto);
    return await this.groupsRepository.save(group);
  }

  async findAll() {
    const groups = await this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.cams', 'cam')
      .loadRelationCountAndMap('group.camsQuantity', 'group.cams')
      .getMany();

    return groups;
  }

  async findOne(id: number): Promise<Group> {
    return await this.groupsRepository.findOneBy({ id });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    await this.groupsRepository.update(id, updateGroupDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
  async associateCamera(groupId: number, camId: number): Promise<Group> {
    this.logger.log(
      `Attempting to associate a camera with ID ${camId} to group ${groupId}`,
    );
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
      relations: ['cams'],
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const cam = await this.camsRepository.findOneBy({ id: camId });

    if (!cam) {
      throw new NotFoundException(`Camera with ID ${camId} not found`);
    }

    //TODO: verificar se uma camera pode estar associada a mais de um grupo
    if (group.cams.some((existingCam) => existingCam.id === cam.id)) {
      this.logger.warn(
        `Camera with ID ${camId} is already in group ${groupId}`,
      );
      return group;
    }

    group.cams.push(cam);
    await this.groupsRepository.save(group);

    this.logger.log(`Camera with ID ${camId} added to group ${groupId}`);
    return group;
  }
}
