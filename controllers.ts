import { Request, Response } from 'express';
import { Game } from './models';

let games: Game[] = [];

export const getGames = (req: Request, res: Response) => {
  res.json(games);
};

export const createGame = (req: Request, res: Response) => {
  const newGame: Game = req.body;
  games.push(newGame);
  res.status(201).json(newGame);
};

export const getGameById = (req: Request, res: Response) => {
  const game = games.find(g => g.id === req.params.id);
  if (game) {
    res.json(game);
  } else {
    res.status(404).send('Game not found');
  }
};

export const updateGame = (req: Request, res: Response) => {
  const index = games.findIndex(g => g.id === req.params.id);
  if (index !== -1) {
    games[index] = req.body;
    res.json(games[index]);
  } else {
    res.status(404).send('Game not found');
  }
};

export const deleteGame = (req: Request, res: Response) => {
  const index = games.findIndex(g => g.id === req.params.id);
  if (index !== -1) {
    const deletedGame = games.splice(index, 1);
    res.json(deletedGame);
  } else {
    res.status(404).send('Game not found');
  }
};
