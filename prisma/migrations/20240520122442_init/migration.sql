/*
  Warnings:

  - You are about to drop the column `fullname` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `photo_path` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `photo_path` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `companies` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Candidates_username_key` ON `Candidates`;

-- DropIndex
DROP INDEX `Companies_username_key` ON `Companies`;

-- AlterTable
ALTER TABLE `Candidates` DROP COLUMN `fullname`,
    DROP COLUMN `password`,
    DROP COLUMN `photo_path`,
    DROP COLUMN `username`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Companies` DROP COLUMN `fullname`,
    DROP COLUMN `password`,
    DROP COLUMN `photo_path`,
    DROP COLUMN `username`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `photo_path` VARCHAR(191) NOT NULL,
    `role` ENUM('candidate', 'recruiter') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Candidates` ADD CONSTRAINT `Candidates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Companies` ADD CONSTRAINT `Companies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
