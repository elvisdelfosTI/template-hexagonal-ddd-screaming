import fs from 'node:fs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';

const app = express();

function startDocServer() {
	if (process.env.NODE_ENV !== 'production') {
		const file = fs.readFileSync('./docs/swagger.yaml', 'utf8');
		const swaggerDocument = yaml.parse(file);

		app.use('/doc', swaggerUi.serve);
		app.get('/doc', swaggerUi.setup(swaggerDocument));

		const PORT = process.env.PORT_DOCUMENTATION || 3003;
		app.listen(PORT, () => {
			console.log(`📜 Documentation: http://localhost:${PORT}/doc`);
		});
	}
}

startDocServer();
