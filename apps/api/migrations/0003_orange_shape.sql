DROP TABLE `chat_messages`;--> statement-breakpoint
DROP TABLE `chat_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`botType` text DEFAULT 'chat' NOT NULL,
	`promptInstructions` text,
	`integrationType` text DEFAULT 'icon' NOT NULL,
	`enableHistory` integer DEFAULT false,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_bots`("id", "userId", "name", "description", "botType", "promptInstructions", "integrationType", "enableHistory", "createdAt", "updatedAt") SELECT "id", "userId", "name", "description", "botType", "promptInstructions", "integrationType", "enableHistory", "createdAt", "updatedAt" FROM `bots`;--> statement-breakpoint
DROP TABLE `bots`;--> statement-breakpoint
ALTER TABLE `__new_bots` RENAME TO `bots`;--> statement-breakpoint
PRAGMA foreign_keys=ON;