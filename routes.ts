import { Router } from 'express';
import { getGames, createGame, getGameById, updateGame, deleteGame } from './controllers';

const router = Router();

router.get('/games', getGames);
router.post('/games', createGame);
router.get('/games/:id', getGameById);
router.put('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);

export default router;
