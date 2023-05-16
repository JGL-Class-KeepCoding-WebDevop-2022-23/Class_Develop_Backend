const nodemailer = require('nodemailer');

module.exports = async function () {
    //entorno desarrollo

    const testAccount = await nodemailer.createTestAccount();

    const developmentConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    };

    const transport = nodemailer.createTransport(developmentConfig);

    return transport
};
