import nodemailer from 'nodemailer';
import env from '../constants/env.constant';

/**
 * Sends a password reset OTP to the user's email address using Nodemailer.
 * If SMTP credentials are not configured, it logs the OTP to the console.
 *
 * @param email - Target recipient email address
 * @param otp - 6-digit verification code
 * @returns boolean indicating email send status
 */
export async function sendOtpEmail(email: string, otp: string): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, EMAIL_FROM } = env;

  // Logging fallback in case of missing SMTP credentials
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('----------------------------------------------------');
    console.log(`[MAIL SIMULATION] OTP for user ${email}: ${otp}`);
    console.log('Please configure SMTP environment variables for actual delivery.');
    console.log('----------------------------------------------------');
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: true,
      logger: true,
    });

    const info = await transporter.sendMail({
      from: `"Portfolio CMS" <${EMAIL_FROM}>`,
      to: email,
      subject: 'One-Time Password (OTP) for CMS Password Reset',
      text: `Your One-Time Password (OTP) for resetting your CMS password is: ${otp}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px;">
          <h2 style="color: #ff3c00;">Portfolio CMS Password Reset</h2>
          <p>You requested to reset your password. Use the following One-Time Password (OTP) to proceed:</p>
          <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; padding: 15px; background-color: #f5f5f5; text-align: center; border-radius: 4px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 14px;">This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
        </div>
      `,
    });

    console.log(`Email sent successfully: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Failed to send OTP email via SMTP:', error);
    // Fall back to console output so developer/tester is not blocked by SMTP issues
    console.log('----------------------------------------------------');
    console.log(`[MAIL FALLBACK] Failed to send email via SMTP.`);
    console.log(`OTP for user ${email}: ${otp}`);
    console.log('----------------------------------------------------');
    return false;
  }
}
