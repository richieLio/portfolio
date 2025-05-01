import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Create a transporter with hardcoded credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // Thay thế bằng email và mật khẩu của bạn
        user: 'lhuyhoang18903@gmail.com',
        pass: 'your-app-password-here',  // Sử dụng App Password từ Google nếu dùng Gmail
      },
    });

    // Email content
    const mailOptions = {
      from: 'lhuyhoang18903@gmail.com',
      to: 'lhuyhoang18903@gmail.com',
      subject: `New contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 