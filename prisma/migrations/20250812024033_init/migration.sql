-- CreateTable
CREATE TABLE "public"."VerificationUser" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" SMALLINT NOT NULL,
    "isAproved" BOOLEAN DEFAULT false,
    "ubication" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationUser_email_key" ON "public"."VerificationUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
