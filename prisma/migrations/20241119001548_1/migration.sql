/*
  Warnings:

  - You are about to drop the column `wawancara_id` on the `ekspresi` table. All the data in the column will be lost.
  - You are about to drop the column `wawancara_id` on the `gestur` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `wawancara` table. All the data in the column will be lost.
  - Added the required column `data_wawancara_id` to the `Ekspresi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_wawancara_id` to the `Gestur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_wawancara_id` to the `Wawancara` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ekspresi` DROP FOREIGN KEY `Ekspresi_wawancara_id_fkey`;

-- DropForeignKey
ALTER TABLE `gestur` DROP FOREIGN KEY `Gestur_wawancara_id_fkey`;

-- DropForeignKey
ALTER TABLE `wawancara` DROP FOREIGN KEY `Wawancara_user_id_fkey`;

-- AlterTable
ALTER TABLE `data_wawancara` MODIFY `deskrpsi_instansi` TEXT NOT NULL,
    MODIFY `deskripsi_posisi` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `ekspresi` DROP COLUMN `wawancara_id`,
    ADD COLUMN `data_wawancara_id` INTEGER NOT NULL,
    MODIFY `saran` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `gestur` DROP COLUMN `wawancara_id`,
    ADD COLUMN `data_wawancara_id` INTEGER NOT NULL,
    MODIFY `saran` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `wawancara` DROP COLUMN `user_id`,
    ADD COLUMN `data_wawancara_id` INTEGER NOT NULL,
    MODIFY `jawaban` TEXT NOT NULL,
    MODIFY `saran` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Wawancara` ADD CONSTRAINT `Wawancara_data_wawancara_id_fkey` FOREIGN KEY (`data_wawancara_id`) REFERENCES `Data_Wawancara`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gestur` ADD CONSTRAINT `Gestur_data_wawancara_id_fkey` FOREIGN KEY (`data_wawancara_id`) REFERENCES `Data_Wawancara`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ekspresi` ADD CONSTRAINT `Ekspresi_data_wawancara_id_fkey` FOREIGN KEY (`data_wawancara_id`) REFERENCES `Data_Wawancara`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
