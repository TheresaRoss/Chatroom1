-- CreateTable
CREATE TABLE `message` (
    `messageId` INTEGER NOT NULL AUTO_INCREMENT,
    `chatroomId` INTEGER NOT NULL,
    `senderId` INTEGER NOT NULL,
    `details` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_chatroomId_fkey` FOREIGN KEY (`chatroomId`) REFERENCES `chatroom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
