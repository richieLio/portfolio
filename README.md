This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Telegram Bot Setup for Contact Form

This project uses a Telegram bot to receive contact form submissions. To set up the bot:

1. Create a new Telegram bot by messaging [@BotFather](https://t.me/botfather) on Telegram
2. Use the `/newbot` command and follow the instructions
3. BotFather will give you a bot token - copy this token
4. Start a conversation with your new bot
5. Get your chat ID by:
   - Sending a message to your bot
   - Visiting `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Look for the `"chat":{"id":123456789}` value in the response
6. Update the `.env.local` file with your bot token and chat ID:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

Now when someone submits your contact form, you'll receive the message directly in your Telegram app.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
