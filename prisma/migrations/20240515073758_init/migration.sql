-- CreateTable
CREATE TABLE `Candidates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `photo_path` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `notelp` VARCHAR(191) NOT NULL,
    `skills` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Candidates_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
