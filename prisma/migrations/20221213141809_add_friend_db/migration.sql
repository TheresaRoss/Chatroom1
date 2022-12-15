-- CreateTable
CREATE TABLE `chatroom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user1Id` INTEGER NOT NULL,
    `user2ID` INTEGER NOT NULL,

    INDEX `Chatroom_user1Id_fkey`(`user1Id`),
    INDEX `Chatroom_user2ID_fkey`(`user2ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `friend` (
    `friendWithId` INTEGER NOT NULL,
    `friendThatId` INTEGER NOT NULL,

    PRIMARY KEY (`friendWithId`, `friendThatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chatroom` ADD CONSTRAINT `Chatroom_user1Id_fkey` FOREIGN KEY (`user1Id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatroom` ADD CONSTRAINT `Chatroom_user2ID_fkey` FOREIGN KEY (`user2ID`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend` ADD CONSTRAINT `friend_friendWithId_fkey` FOREIGN KEY (`friendWithId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend` ADD CONSTRAINT `friend_friendThatId_fkey` FOREIGN KEY (`friendThatId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
