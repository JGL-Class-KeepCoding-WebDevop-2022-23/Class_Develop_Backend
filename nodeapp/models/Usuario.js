const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailTransportConfigure = require('../lib/emailTransportConfigure');
const nodemailer = require('nodemailer');

// crear esquema
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
});

// método estático
usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
    return bcrypt.hash(passwordEnClaro, 7);
};

// método de instancia
usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
    return bcrypt.compare(passwordEnClaro, this.password);
};

usuarioSchema.methods.enviarEmail = async function (asunto, cuerpo) {
    //Crear transpor
    const transport = await emailTransportConfigure();

    //enviar email
    const result = await transport.sendMail({
        from: process.envEMAIL_SERVICE_FROM,
        ti: this.mail,
        subject: asunto,
        html: cuerpo,
    });
    console.log(`Email enviado: ${result.messageId}`);

    console.log(
        `URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`
    );
};
// crear el modelo}
const Usuario = mongoose.model('Usuario', usuarioSchema);

// exportar el modelo
module.exports = Usuario;
