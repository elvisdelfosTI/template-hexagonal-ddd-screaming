import express from 'express';
import { authorRouter } from './lib/Author/infrastructure/api/express/ExpressAuthorRouter';
const app = express();
app.use(express.json());
// * SWAGGER
// * ROUTES
app.use(express.json());
app.use(authorRouter);
app.get('/', (req, res) => {
    res.send('!hello  world !');
});
app.use((err, req, res, _next) => {
    if (err instanceof Error) {
        console.error(err);
        res.status(500).send(err.message);
    }
    console.error(err);
    res.status(500).send('Something broke!');
});
app.listen(3000, () => {
    console.log('🚀 Server is running at http://localhost:3000');
});
