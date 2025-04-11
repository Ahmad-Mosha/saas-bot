-- Create conversations table
CREATE TABLE `conversations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`botId` integer NOT NULL,
	`title` text NOT NULL DEFAULT 'New Conversation',
	`createdAt` integer NOT NULL DEFAULT (unixepoch()),
	`updatedAt` integer NOT NULL DEFAULT (unixepoch()),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade,
	FOREIGN KEY (`botId`) REFERENCES `bots`(`id`) ON DELETE cascade
);

-- Create messages table
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`conversationId` integer NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer NOT NULL DEFAULT (unixepoch()),
	FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`id`) ON DELETE cascade
);

-- Create indexes for faster queries
CREATE INDEX `conversations_userId_idx` ON `conversations` (`userId`);
CREATE INDEX `conversations_botId_idx` ON `conversations` (`botId`);
CREATE INDEX `messages_conversationId_idx` ON `messages` (`conversationId`); 