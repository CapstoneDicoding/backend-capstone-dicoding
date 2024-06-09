/*
  Warnings:

  - You are about to alter the column `accuracy` on the `Curriculum_vitaes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Curriculum_vitaes` ADD COLUMN `summarized_cv_json` JSON NULL,
    MODIFY `accuracy` DOUBLE NULL;
