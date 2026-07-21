// Email service - configure with your preferred email provider
// Supports: SendGrid, Mailgun, AWS SES, SMTP, etc.

const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@primepredict.co.ke';
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'console';

// In-memory email store for development
const emailStore = [];

const emailTemplates = {
  welcome: (data) => ({
    subject: 'Welcome to PrimePredict.co.ke - Verify Your Email!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00E5FF;">Welcome to PrimePredict! 🏆</h1>
        <p>Hi ${data.name},</p>
        <p>Thank you for joining PrimePredict.co.ke - Kenya's premier football prediction platform.</p>
        <p>Please verify your email address to unlock all features:</p>
        <a href="${data.verifyUrl}"
           style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #00E5FF, #7C4DFF); color: #0A0E27; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 700;">
          ✅ Verify Email Address
        </a>
        <p style="color: #999; font-size: 13px;">This link expires in 24 hours.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">If you didn't create an account, please ignore this email.</p>
        <p style="color: #666; font-size: 12px;">PrimePredict.co.ke - Premium Football Predictions</p>
      </div>
    `,
  }),

  resetPassword: (data) => ({
    subject: 'Password Reset - PrimePredict.co.ke',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00E5FF;">Password Reset</h1>
        <p>Hi ${data.name},</p>
        <p>We received a request to reset your password. Click the button below to set a new password.</p>
        <a href="${data.resetUrl}"
           style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #00E5FF, #7C4DFF); color: #fff; text-decoration: none; border-radius: 8px; margin: 20px 0;">
          Reset Password
        </a>
        <p>If you didn't request this, please ignore this email.</p>
        <p style="color: #666; font-size: 12px;">This link expires in 1 hour.</p>
      </div>
    `,
  }),

  premiumActivated: (data) => ({
    subject: 'Premium Plan Activated! - PrimePredict.co.ke',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FFD700;">Welcome to Premium! ⭐</h1>
        <p>Congratulations ${data.name}!</p>
        <p>Your ${data.plan} premium plan is now active. You now have access to all premium predictions and exclusive features.</p>
        <a href="${process.env.SITE_URL || 'https://primepredict.co.ke'}/premium"
           style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #7C4DFF, #FFD700); color: #fff; text-decoration: none; border-radius: 8px; margin: 20px 0;">
          Access Premium Predictions
        </a>
      </div>
    `,
  }),
};

export async function sendEmail({ to, subject, html, text = '' }) {
  try {
    switch (EMAIL_PROVIDER) {
      case 'sendgrid': {
        const sgMail = await import('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send({ to, from: EMAIL_FROM, subject, html, text });
        break;
      }
      case 'mailgun': {
        const formData = await import('form-data');
        const Mailgun = await import('mailgun.js');
        const mg = Mailgun.default.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
        await mg.messages.create(process.env.MAILGUN_DOMAIN, { from: EMAIL_FROM, to, subject, html, text });
        break;
      }
      case 'ses': {
        // AWS SES integration
        console.log(`AWS SES email to ${to}: ${subject}`);
        break;
      }
      default: {
        // Console/development mode
        const email = { to, from: EMAIL_FROM, subject, html, text, sentAt: new Date() };
        emailStore.push(email);
        console.log(`[EMAIL] To: ${to} | Subject: ${subject}`);
        break;
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: err.message };
  }
}

export async function sendWelcomeEmail(user, verificationToken) {
  const verifyUrl = `${process.env.SITE_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
  const template = emailTemplates.welcome({ name: user.name, verifyUrl });
  return sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
}

export async function sendPasswordResetEmail(user, resetToken) {
  const resetUrl = `${process.env.SITE_URL || 'https://primepredict.co.ke'}/reset-password?token=${resetToken}`;
  const template = emailTemplates.resetPassword({ name: user.name, resetUrl });
  return sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
}

export async function sendPremiumActivatedEmail(user, plan) {
  const template = emailTemplates.premiumActivated({ name: user.name, plan });
  return sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
}

// For development: retrieve sent emails
export function getSentEmails() {
  return [...emailStore];
}

