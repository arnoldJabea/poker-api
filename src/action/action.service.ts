import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionService {
  bet(playerId: number, amount: number) {
    
    return `Player ${playerId} has bet ${amount}€`;
  }

  fold(playerId: number) {
    // Le joueur se couche
    return `Player ${playerId} has folded`;
  }

  call(playerId: number) {
    // Le joueur suit la mise en cours
    return `Player ${playerId} has called`;
  }

  raise(playerId: number, amount: number) {
    // Le joueur relance
    return `Player ${playerId} has raised ${amount}€`;
  }

  check(playerId: number) {
    // Le joueur passe son tour sans miser
    return `Player ${playerId} has checked`;
  }
}
