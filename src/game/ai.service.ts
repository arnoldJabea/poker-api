import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Table } from '../tables/table.entity';
import { BetService } from '../game/bet/bet.service';

@Injectable()
export class AIService {
    constructor(private readonly betService: BetService) {}

    async makeDecision(aiPlayer: User, table: Table) {
        const decision = this.getAIAction(aiPlayer, table);

        switch (decision.action) {
            case 'fold':
                console.log(`${aiPlayer.username} se couche.`);
                return { action: 'fold' };

            case 'check':
                console.log(`${aiPlayer.username} check.`);
                return { action: 'check' };

            case 'call':
                console.log(`${aiPlayer.username} suit avec ${table.currentBet}€.`);
                return this.betService.placeBet(aiPlayer.id, table.id, table.currentBet);

            case 'raise':
                const raiseAmount = table.currentBet * 2;
                console.log(`${aiPlayer.username} relance à ${raiseAmount}€.`);
                return this.betService.placeBet(aiPlayer.id, table.id, raiseAmount);

            default:
                return { action: 'fold' };
        }
    }

    private getAIAction(aiPlayer: User, table: Table) {
        const actions = ['fold', 'check', 'call', 'raise'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        return { action: randomAction };
    }
}