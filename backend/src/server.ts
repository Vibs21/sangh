import app from './index';

import * as dotenv from 'dotenv';
dotenv.config();
 
const port = process.env.PORT || 3002;

app.listen(port);