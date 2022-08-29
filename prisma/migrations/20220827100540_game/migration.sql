-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "round" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gameId" TEXT,
    "chipsInBag" TEXT[],
    "chipsOnBoard" JSONB[],
    "dropletValue" INTEGER NOT NULL DEFAULT 0,
    "ratValue" INTEGER NOT NULL DEFAULT 0,
    "rubies" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
