-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasDataClient" BOOLEAN NOT NULL DEFAULT false,
    "dataLimit" INTEGER NOT NULL DEFAULT 10,
    "dev_coins" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "DataClient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isWoner" BOOLEAN NOT NULL DEFAULT false,
    "isBaned" BOOLEAN NOT NULL DEFAULT false,
    "level" TEXT,
    "xp" INTEGER DEFAULT 0,
    "money" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DataClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DataClient_jid_key" ON "DataClient"("jid");
