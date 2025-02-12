import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionService {
    bet(playerId: number, amount: number) {
        // Verification du solde du joueur
        return `Player ${playerId} has bet ${amount}€`;
    }

    fold(playerId: number) {

        return `Player ${playerId} has folded`;
    }
    raise(playerId: number, amount: number) {

        return `Player ${playerId} has raised ${amount}€`;
    }
    check(playerId: number) {

        return `Player ${playerId} has checked`;
    }

}
