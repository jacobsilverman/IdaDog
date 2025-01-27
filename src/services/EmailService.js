import axios from 'axios';

export const sendEmail = async (info) => {
    try {
        console.log(info);
        const verificationLink = `http://localhost:5000/confirm-reservation?n=${info.name}&p=${info.phone}&s=${info.start}&e=${info.end}&st=${info.startTime}&et=${info.endTime}`;
        const response = await axios.post('http://localhost:5000/send-email', {
            to: 'jacob.h.silverman@gmail.com',
            subject: 'Confirm Reservation',
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
                            <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Thank you for scheduling with Idadog!</h1>
                            <p>Please verify all the information below in order to schedule your service.</p>
                            <p>
                                <a 
                                    href="${verificationLink}" 
                                    style="color: red; text-decoration: none;"
                                >
                                    Click here to confirm and reserve your reservation
                                </a>
                            </p>
                            <p>If any of the information is incorrect and you wish to change your planned service, please ignore this email and reschedule on <a href="idadog.com">Idadog.com</a></p>
                            <p>name: ${info.name}</p>
                            <p>start date: ${info.start}</p>
                            <p>${info.startTime ? "start time: "+info.startTime : ''}</p>
                            <p>end date: ${info.end}</p>
                            <p>${info.endTime ? "end time: "+info.endTime : ''}</p>
                            <p>phone: ${info.phone}</p>
                        </div>
                    </body>
                </html>
            `,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};