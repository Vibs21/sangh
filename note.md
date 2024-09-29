*benefits of orm*

- simple syntax
- syntax remains the same, no matter what db you are using
- auto completion
- automatic migrations

Required things to start with this repo

- npm init -y
- npx tsc --init
- npm install prisma typescript ts-node @types/node --save
- npm install express @types/express --save
- npm install dotenv --save *to read variable from .env file into ts file*
- npx prisma init
- npx prisma migrate dev --name UserAndTodoTableAdded
- npx prisma generate
- npm run seed *if you have data for the table to be seeded seed.ts, package.json=> "seed": "ts-node prisma/seed.ts"*
  

**After making all the initial changes into the index.ts file**
- npx tsc -b
- node dist/index.js

#####################################

- create scheme of prisma
- run cmd to create migration folder
- run cmd to generate the client, which expose the clases to be used in TS files/fucntions


https://console.neon.tech/app/projects/long-unit-39178442/branches/br-royal-feather-a5mzbdxc/tables

**Unit Testing using Jest**

 - npm install --save-dev jest supertest ts-jest @types/jest @types/supertest typescript                                                                                                                                                
- ts-node skips the compilSation step to .js and directly runs the TypeScript files in memory without generating output .js files:
- 