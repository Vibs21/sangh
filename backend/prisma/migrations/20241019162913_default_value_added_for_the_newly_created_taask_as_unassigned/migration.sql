-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "assignedTo" SET DEFAULT 'Unassigned';

-- AlterTable
CREATE SEQUENCE taskstatus_id_seq;
ALTER TABLE "TaskStatus" ALTER COLUMN "id" SET DEFAULT nextval('taskstatus_id_seq');
ALTER SEQUENCE taskstatus_id_seq OWNED BY "TaskStatus"."id";

-- CreateTable
CREATE TABLE "Poll" (
    "id" SERIAL NOT NULL,
    "question" TEXT,
    "status" TEXT DEFAULT 'Open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoleOption" (
    "id" SERIAL NOT NULL,
    "pollId" INTEGER NOT NULL,
    "pollOption" TEXT NOT NULL,

    CONSTRAINT "PoleOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoleVote" (
    "id" SERIAL NOT NULL,
    "pollId" INTEGER NOT NULL,
    "poleOptionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PoleVote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoleOption" ADD CONSTRAINT "PoleOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoleVote" ADD CONSTRAINT "PoleVote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoleVote" ADD CONSTRAINT "PoleVote_poleOptionId_fkey" FOREIGN KEY ("poleOptionId") REFERENCES "PoleOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoleVote" ADD CONSTRAINT "PoleVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
