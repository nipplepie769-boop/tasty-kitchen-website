const nodemailer = require('nodemailer');

// For development, we'll use Ethereal - a fake SMTP service
async function createTestAccount() {
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    return { transporter, testAccount };
}

let emailConfig = null;

async function getEmailTransporter() {
    if (!emailConfig) {
        // If production SMTP settings exist, use them
        if (process.env.SMTP_HOST) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT || 587),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            emailConfig = { transporter };
        } else {
            // Use Ethereal for development
            emailConfig = await createTestAccount();
            console.log('Development email credentials:');
            console.log('Username:', emailConfig.testAccount.user);
            console.log('Password:', emailConfig.testAccount.pass);
        }
    }
    return emailConfig.transporter;
}

module.exports = { getEmailTransporter };