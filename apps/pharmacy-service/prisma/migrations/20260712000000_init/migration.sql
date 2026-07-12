-- CreateTable
CREATE TABLE `Medicine` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `genericName` VARCHAR(191) NULL,
    `manufacturer` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `unitPrice` DOUBLE NOT NULL,
    `requiresPrescription` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Medicine_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` VARCHAR(191) NOT NULL,
    `medicineId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `reorderLevel` INTEGER NOT NULL DEFAULT 10,
    `batchNumber` VARCHAR(191) NULL,
    `expiryDate` DATETIME(3) NULL,
    `supplier` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Inventory_medicineId_key`(`medicineId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prescription` (
    `id` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `appointmentId` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrescriptionItem` (
    `id` VARCHAR(191) NOT NULL,
    `prescriptionId` VARCHAR(191) NOT NULL,
    `medicineId` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dispensation` (
    `id` VARCHAR(191) NOT NULL,
    `prescriptionId` VARCHAR(191) NOT NULL,
    `pharmacistId` VARCHAR(191) NOT NULL,
    `dispensedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Dispensation_prescriptionId_key`(`prescriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DispensationItem` (
    `id` VARCHAR(191) NOT NULL,
    `dispensationId` VARCHAR(191) NOT NULL,
    `medicineId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `Medicine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionItem` ADD CONSTRAINT `PrescriptionItem_prescriptionId_fkey` FOREIGN KEY (`prescriptionId`) REFERENCES `Prescription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionItem` ADD CONSTRAINT `PrescriptionItem_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `Medicine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dispensation` ADD CONSTRAINT `Dispensation_prescriptionId_fkey` FOREIGN KEY (`prescriptionId`) REFERENCES `Prescription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DispensationItem` ADD CONSTRAINT `DispensationItem_dispensationId_fkey` FOREIGN KEY (`dispensationId`) REFERENCES `Dispensation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DispensationItem` ADD CONSTRAINT `DispensationItem_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `Medicine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
