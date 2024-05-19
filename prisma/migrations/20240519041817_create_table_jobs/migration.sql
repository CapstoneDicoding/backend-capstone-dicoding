-- CreateTable
CREATE TABLE `Jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `business_sector` VARCHAR(191) NOT NULL,
    `requirements` VARCHAR(191) NOT NULL,
    `candidate_needed` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
