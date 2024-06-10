-- DropForeignKey
ALTER TABLE `Candidates` DROP FOREIGN KEY `Candidates_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Companies` DROP FOREIGN KEY `Companies_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Curriculum_vitaes` DROP FOREIGN KEY `Curriculum_vitaes_candidate_id_fkey`;

-- DropForeignKey
ALTER TABLE `Curriculum_vitaes` DROP FOREIGN KEY `Curriculum_vitaes_job_id_fkey`;

-- DropForeignKey
ALTER TABLE `Jobs` DROP FOREIGN KEY `Jobs_company_id_fkey`;

-- AddForeignKey
ALTER TABLE `Candidates` ADD CONSTRAINT `Candidates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Companies` ADD CONSTRAINT `Companies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curriculum_vitaes` ADD CONSTRAINT `Curriculum_vitaes_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curriculum_vitaes` ADD CONSTRAINT `Curriculum_vitaes_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
