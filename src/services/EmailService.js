import axios from 'axios';

export const sendEmail = async () => {
    try {
        const verificationToken = 'your-generated-verification-token'; // Generate or fetch this from your backend
        const verificationLink = `http://localhost:5000/verify-email?token=${verificationToken}`;
        const response = await axios.post('http://localhost:5000/send-email', {
            to: 'jacob.h.silverman@gmail.com',
            subject: 'Test Email',
            html: `
                <!doctype html>
                <html>
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <style>
                            /* Hover effect for supported email clients */
                            a:hover {
                                color: pink !important;
                                text-decoration: underline !important;
                            }
                        </style>
                    </head>
                    <body style="font-family: sans-serif;">
                        <div style="display: block; margin: auto; max-width: 600px;" class="main">
                            <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
                            <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
                            <p>Now send your email using our fake SMTP server and integration of your choice!</p>
                            <p>Good luck! Hope it works.</p>
                            <p>
                                <a 
                                    href="${verificationLink}" 
                                    style="color: red; text-decoration: none;"
                                >
                                    Verify Email
                                </a>
                            </p>
                        </div>
                    </body>
                </html>
            `,
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};