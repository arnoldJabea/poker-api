import { Injectable } from '@nestjs/common';

@Injectable()
export class TablesService {
    tables: any[];

    constructor() {
        this.tables = ["noob", "intermediate", "pro"];
    }

    findAll() {
        return this.tables;
    }
}
