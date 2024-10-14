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

- create schema for prisma
- run cmd to create migration folder
- run cmd to generate the client, which expose the classes to be used in TS files/functions


https://console.neon.tech/app/projects/long-unit-39178442/branches/br-royal-feather-a5mzbdxc/tables

**Unit Testing using Jest**

 - npm install --save-dev jest supertest ts-jest @types/jest @types/supertest typescript                                                                                                                                                
- ts-node skips the compilSation step to .js and directly runs the TypeScript files in memory without generating output .js files:
- expect(LHS).toBe(RHS)
- LHS is, the value set by us which we are expecting the function or the method will return when we call it, the Returned by the function is RHS, when they come as same, the test will pass
  - if we take example from the methods where we are testing singin api, we have declared or created mock dummy data 
    - with the mock data, hum ab ye pata h ki ky ana chaiye, fucntional call hone ke bd, we know the ans is 4, when we pass 2, 2, not the thing is what function is going to return in return it is 4 or it is some different value
  - we will then call the function method, with some parameter to check
  - check the mock data value with the return data value