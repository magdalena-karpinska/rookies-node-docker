import express, { Request, Response } from 'express';
import { logger } from './logger';

const app = express();
const port = 8080;
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Hello from Index1');

  logger.info('Index page!');
});

app.get('/status', (_req: Request, res: Response) => {
  res.status(200).send('Hello from Rookies');

  logger.info('Status page!');
});

app.post('/payments', (req: Request, res: Response) => {
  const { carId, amount } = req.body;
  console.log(carId);
  console.log(amount);

  if (typeof amount !== 'number' || !Number.isInteger(amount)) {
    logger.log({
      message: 'Invalid amount. It must be an integer.',
      level: 'error',
    });
    return res
      .status(400)
      .json({ error: 'Invalid amount. It must be an integer.' });
  }

  const random = Math.random();

  if (random > 0.5) {
    logger.log({
      message: 'Invalid random. It must be less than 0.5.',
      level: 'error',
    });
  }

  res.status(200).json('Payment success');
  logger.info({
    level: 'info',
    message: 'Payment processed successfully',
    carId,
    amount,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
