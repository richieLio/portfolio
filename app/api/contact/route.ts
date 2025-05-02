import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '7886310755:AAFnjK1AOw0xnvydqnydgCzWKibScP9dYbU';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '1601898211';

// Initialize the bot (using polling: false since we're just sending messages)
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
📬 *New Contact Form Submission*

*Name:* ${name}
*Email:* ${email}

*Message:*
${message}
`;

    // Send message to Telegram
    await bot.sendMessage(TELEGRAM_CHAT_ID, telegramMessage, {
      parse_mode: 'Markdown',
    });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 