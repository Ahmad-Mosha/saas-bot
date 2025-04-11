# AI Chat Integration with Google Gemini

This document describes the implementation of the Google Gemini AI integration for the chatbot platform.

## Overview

The system allows users to create and interact with bots using Google's Gemini AI models. Each bot can have different settings:

- **Bot Type** - Determines which Gemini model to use:

  - `chat`: Uses `gemini-2.0-flash`
  - `image`: Uses `gemini-2.0-flash-exp-image-generation`
  - `code`: Uses `gemini-2.5-pro-preview-03-25`

- **History Setting** - Controls if chat history is stored:

  - When `enableHistory` is true, conversations and messages are stored in the database
  - When `enableHistory` is false, no history is preserved

- **Bot Identity** - Each bot has its own identity that affects AI responses:
  - `name`: The bot's name (used in system prompt)
  - `description`: Brief description of the bot's purpose (used in system prompt)
  - `promptInstructions`: Custom instructions that define the bot's behavior, tone, and capabilities (used in system prompt)

## API Endpoints

### Bot Endpoints

- `POST /bots` - Create a new bot

  ```json
  {
    "name": "Code Assistant",
    "description": "Helps with coding questions",
    "botType": "code",
    "promptInstructions": "You are a helpful coding assistant. Always include code examples in your responses.",
    "integrationType": "icon",
    "enableHistory": true
  }
  ```

- `GET /bots` - Get all bots
- `GET /bots/:id` - Get a specific bot
- `PUT /bots/:id` - Update a bot
- `DELETE /bots/:id` - Delete a bot

### Chat Endpoints

- `POST /chat/bot/:botId` - Send a message to a bot (new conversation)

  ```json
  {
    "message": "How do I create a simple Express server?"
  }
  ```

- `POST /chat/bot/:botId/conversation/:conversationId` - Send a message to a bot (existing conversation)

  ```json
  {
    "message": "How do I add middleware to it?"
  }
  ```

- `GET /chat/conversation/:conversationId/messages` - Get all messages in a conversation

### Conversation Endpoints

- `POST /conversations` - Create a new conversation

  ```json
  {
    "botId": 1,
    "title": "My Conversation"
  }
  ```

- `GET /conversations` - Get all user conversations
- `GET /conversations?botId=X` - Get all conversations for a specific bot
- `GET /conversations/:id` - Get a specific conversation
- `PUT /conversations/:id` - Update conversation details
- `POST /conversations/:id/transfer` - Transfer a conversation to a different bot

  ```json
  {
    "botId": 2
  }
  ```

- `DELETE /conversations/:id` - Delete a conversation and its messages

## Database Schema

The solution uses two new tables:

1. `conversations` - Stores chat sessions

   - Related to a specific bot and user
   - Contains metadata like title and timestamps

2. `messages` - Stores individual messages
   - Related to a specific conversation
   - Records both user and assistant messages
   - Only created when a bot has `enableHistory: true`

## Implementation Details

- **Model Selection**: The `GeminiService` selects the appropriate model based on the bot type.
- **History Management**: The service checks the bot's `enableHistory` setting before storing any conversations or messages.
- **Conversation Management**: When history is enabled, conversations are created automatically when a user sends their first message to a bot.
- **Bot Identity**: The system creates a custom system prompt for each bot based on its name, description, and promptInstructions. This makes every bot uniquely aware of its identity and purpose.
- **Response Format**: All chat responses include the full bot details along with the AI's response.
- **Conversation Validation**: The system ensures that a conversation can only be used with the bot it was created for, preventing accidental mismatches.
- **Conversation Transfer**: If you need to continue a conversation with a different bot, you can explicitly transfer ownership using the transfer endpoint.

## How Bot Identity Works

When a user interacts with a bot, the system creates a personalized system prompt that includes:

1. The bot's name (e.g., "You are Code Assistant")
2. The bot's description (e.g., "Helps with coding questions")
3. The bot's custom prompt instructions (e.g., "Always include code examples in your responses")

This system prompt is sent to the Gemini API with every conversation, ensuring the AI model responds consistently with the bot's defined identity and purpose. For example:

```
You are Code Assistant, Helps with coding questions. You are a helpful coding assistant. Always include code examples in your responses.
```

## Getting Started

1. Ensure the GEMINI_API_KEY is set in your .env file
2. Run migrations to create the new tables: `bun run db:migrate`
3. Start the API server: `bun dev`

## Usage Examples

### Create a Bot

```bash
curl -X POST http://localhost:3000/bots \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Code Assistant",
    "description": "Helps with coding questions",
    "botType": "code",
    "promptInstructions": "You are a helpful coding assistant. Provide concise and accurate answers to coding questions.",
    "integrationType": "icon",
    "enableHistory": true
  }'
```

### Start a Conversation with a Bot

```bash
curl -X POST http://localhost:3000/chat/bot/1 \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I create a simple Express server in Node.js?"
  }'
```

### Continue a Conversation

```bash
curl -X POST http://localhost:3000/chat/bot/1/conversation/1 \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I add middleware to it?"
  }'
```

### Transfer a Conversation to a Different Bot

```bash
curl -X POST http://localhost:3000/conversations/1/transfer \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "botId": 2
  }'
```

### Get Messages in a Conversation

```bash
curl -X GET http://localhost:3000/chat/conversation/1/messages \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN"
```
