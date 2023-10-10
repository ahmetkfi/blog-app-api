-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "e_mail" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_e_mail_key" ON "User"("e_mail");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");
