-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "images" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "viewCount" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "viewCount" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "tech" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagRelation" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "blogId" INTEGER,
    "projectId" INTEGER,

    CONSTRAINT "TagRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyRelation" (
    "id" SERIAL NOT NULL,
    "techId" INTEGER NOT NULL,
    "blogId" INTEGER,
    "projectId" INTEGER,

    CONSTRAINT "TechnologyRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_description_key" ON "Blog"("description");

-- CreateIndex
CREATE INDEX "TagRelation_tagId_idx" ON "TagRelation"("tagId");

-- CreateIndex
CREATE INDEX "TagRelation_blogId_idx" ON "TagRelation"("blogId");

-- CreateIndex
CREATE INDEX "TagRelation_projectId_idx" ON "TagRelation"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TagRelation_tagId_blogId_projectId_key" ON "TagRelation"("tagId", "blogId", "projectId");

-- CreateIndex
CREATE INDEX "TechnologyRelation_techId_idx" ON "TechnologyRelation"("techId");

-- CreateIndex
CREATE INDEX "TechnologyRelation_blogId_idx" ON "TechnologyRelation"("blogId");

-- CreateIndex
CREATE INDEX "TechnologyRelation_projectId_idx" ON "TechnologyRelation"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnologyRelation_techId_blogId_projectId_key" ON "TechnologyRelation"("techId", "blogId", "projectId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagRelation" ADD CONSTRAINT "TagRelation_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagRelation" ADD CONSTRAINT "TagRelation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagRelation" ADD CONSTRAINT "TagRelation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyRelation" ADD CONSTRAINT "TechnologyRelation_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyRelation" ADD CONSTRAINT "TechnologyRelation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyRelation" ADD CONSTRAINT "TechnologyRelation_techId_fkey" FOREIGN KEY ("techId") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
