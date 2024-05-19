-- CreateTable
CREATE TABLE `Curriculum_vitaes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `original_cv_path` VARCHAR(191) NOT NULL,
    `summarized_cv_path` VARCHAR(191) NOT NULL,
    `accuracy` INTEGER NOT NULL,
    `status` ENUM('accepted', 'denied', 'queueing') NOT NULL,
    `candidate_id` INTEGER NOT NULL,
    `job_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Curriculum_vitaes` ADD CONSTRAINT `Curriculum_vitaes_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curriculum_vitaes` ADD CONSTRAINT `Curriculum_vitaes_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
