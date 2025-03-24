import { Controller, Get, Post, Param, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { TableService } from './tables.service';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  /** 
   *  **Créer une nouvelle table**
   * @param body { name: string, maxPlayers?: number }
   */
  @Post()
  async createTable(@Body() body: { name: string; maxPlayers?: number }) {
    if (!body.name) {
      throw new BadRequestException('Le nom de la table est requis');
    }
    return this.tableService.createTable(body.name, body.maxPlayers);
  }

  
  @Get()
  async findAll() {
    return this.tableService.findAll();
  }

  /** 
   *  **Récupérer une table spécifique par son ID**
   * @param id Identifiant de la table
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tableService.findOne(Number(id));
  }

  /** 
   * **Rejoindre une table**
   * @param id ID de la table
   * @param body { userId: number } ID de l'utilisateur
   */
  @Post(':id/join')
  async joinTable(@Param('id') id: number, @Body('userId') userId: number) {
    if (!userId) {
      throw new BadRequestException("L'ID de l'utilisateur est requis");
    }
    return this.tableService.joinTable(Number(id), userId);
  }

  /** 
   * **Quitter une table**
   * @param id ID de la table
   * @param body { userId: number } ID de l'utilisateur
   */
  @Post(':id/leave')
  async leaveTable(@Param('id') id: number, @Body('userId') userId: number) {
    if (!userId) {
      throw new BadRequestException("L'ID de l'utilisateur est requis");
    }
    return this.tableService.leaveTable(userId);
  }

  /** 
   *  **Distribuer les cartes aux joueurs d'une table**
   * @param id ID de la table
   */
  @Post(':id/deal')
  async dealCards(@Param('id') id: number) {
    return this.tableService.dealCardsToPlayers(Number(id));
  }
}