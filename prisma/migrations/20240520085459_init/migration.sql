/*
  Warnings:

  - The values [queueing] on the enum `Curriculum_vitaes_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Curriculum_vitaes` MODIFY `status` ENUM('accepted', 'denied', 'queuing') NOT NULL;
