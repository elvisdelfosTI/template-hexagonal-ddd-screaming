import yaml from 'yaml';
import fs from 'fs';
const file = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(file);
export default swaggerDocument;
