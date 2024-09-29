import app from './index';

import * as dotenv from 'dotenv';
dotenv.config();
 
const port = process.env.PORT || 3002;

console.log('running on port')


app.listen(port);