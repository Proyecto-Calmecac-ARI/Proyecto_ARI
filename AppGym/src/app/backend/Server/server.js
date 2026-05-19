//ejecuta el server node server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
app.post('/enviar-correo', async (req, res) => {
  try {
    const { usuario, tipo } = req.body;
    const fecha = new Date();
    const hora = fecha.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const fechaActual = fecha.toLocaleDateString();
    const mensajesMotivacionales = [
      '💪 La disciplina vence al talento.',
      '🔥 Nunca te rindas.',
      '🏋️ Hoy toca entrenar.',
      '⚡ Tu cuerpo puede con todo.',
      '🚀 La constancia crea resultados.',
      '👑 Los campeones se construyen todos los días.',
      '🔥 Sin excusas. Solo resultados.',
    ];
    const mensajeRandom =
      mensajesMotivacionales[
        Math.floor(Math.random() * mensajesMotivacionales.length)
      ];
    let asunto = '';
    let contenidoHTML = '';
    // LOGIN
    if (tipo === 'login') {
      asunto = '🔥 Acceso detectado | FIT MANAGER';
      contenidoHTML = `
      <div style="
        margin:0;
        padding:50px 0;
        background:#000000;
        font-family:Arial,sans-serif;
      ">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="680" cellpadding="0" cellspacing="0" style="
                background:#111111;
                border-radius:28px;
                overflow:hidden;
                border:1px solid #FF0000;
              ">
                <tr>
                  <td style="
                    background:#000000;
                    padding:55px 40px;
                    text-align:center;
                    border-bottom:4px solid #FF0000;
                  ">
                    <h1 style="
                      color:#FFFFFF !important;
                      margin:0;
                      font-size:44px;
                      font-weight:bold;
                      letter-spacing:4px;
                    ">
                      FIT MANAGER
                    </h1>
                    <p style="
                      color:#FF0000;
                      margin-top:18px;
                      font-size:18px;
                      letter-spacing:3px;
                    ">
                      ACCESO EXITOSO
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:45px;">
                    <h2 style="
                      color:#FFFFFF;
                      margin-top:0;
                      font-size:32px;
                    ">
                      Hola ${usuario.nombreUsuario || 'Usuario'} 👋
                    </h2>
                    <p style="
                      color:#cfcfcf;
                      font-size:17px;
                      line-height:1.8;
                    ">
                      Detectamos un inicio de sesión exitoso en tu cuenta.
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="
                      margin-top:35px;
                      background:#161616;
                      border-radius:20px;
                      border:1px solid #2a2a2a;
                    ">
                      <tr>
                        <td style="padding:35px;">

                          <h3 style="
                            color:#FF0000;
                            margin-top:0;
                            margin-bottom:25px;
                            font-size:24px;
                          ">
                            ⚡ Información del usuario
                          </h3>

                          <p style="color:#FFFFFF;">
                            <strong>👤 Nombre:</strong>
                            ${usuario.nombreUsuario}
                            ${usuario.apellidosUsuario}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>📧 Correo:</strong>
                            ${usuario.correo}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>🎯 Objetivo:</strong>
                            ${usuario.objetivo}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>🏋️ Rutina:</strong>
                            ${usuario.rutinaActiva?.nombreLista || 'Sin rutina'}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>🔥 Calorías:</strong>
                            ${usuario.caloriasQuemadas}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>🏆 Trofeos:</strong>
                            ${usuario.trofeos}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>💎 Plan:</strong>
                            ${usuario.planAsociado?.nombrePlan}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>📅 Fecha:</strong>
                            ${fechaActual}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>⏰ Hora:</strong>
                            ${hora}
                          </p>

                        </td>
                      </tr>

                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0" style="
                      margin-top:35px;
                      background:#220000;
                      border-left:6px solid #FF0000;
                      border-radius:20px;
                    ">

                      <tr>
                        <td style="padding:30px;">

                          <h2 style="
                            color:#FFFFFF;
                            margin:0;
                            font-size:28px;
                          ">
                            ${mensajeRandom}
                          </h2>

                        </td>
                      </tr>

                    </table>

                    <div style="
                      text-align:center;
                      margin-top:45px;
                    ">

                      <a href="#"
                        style="
                          background:#FF0000;
                          color:#FFFFFF;
                          text-decoration:none;
                          padding:18px 45px;
                          border-radius:14px;
                          display:inline-block;
                          font-weight:bold;
                          font-size:18px;
                        ">
                        🔥 CONTINUAR ENTRENANDO
                      </a>

                    </div>

                  </td>
                </tr>

                <tr>
                  <td style="
                    background:#050505;
                    text-align:center;
                    padding:35px;
                  ">

                    <p style="
                      color:#777777;
                      margin:0;
                      font-size:14px;
                    ">
                      FIT MANAGER © 2025
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </div>

      `;
    }
     // RECORDATORIO
    if (tipo === 'recordatorio') {

      asunto = '🔥 Hoy toca entrenar | FIT MANAGER';

      contenidoHTML = `
      
      <div style="
        margin:0;
        padding:50px 0;
        background:#000000;
        font-family:Arial,sans-serif;
      ">

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">

              <table width="680" cellpadding="0" cellspacing="0" style="
                background:#111111;
                border-radius:28px;
                overflow:hidden;
                border:1px solid #FF0000;
              ">

                <!-- HEADER -->
                <tr>
                  <td style="
                    background:#000000;
                    padding:55px 40px;
                    text-align:center;
                    border-bottom:4px solid #FF0000;
                  ">

                    <h1 style="
                      color:#FFFFFF !important;
                      margin:0;
                      font-size:44px;
                      font-weight:bold;
                      letter-spacing:4px;
                    ">
                      FIT MANAGER
                    </h1>

                    <p style="
                      color:#FF0000;
                      margin-top:18px;
                      font-size:18px;
                      letter-spacing:3px;
                    ">
                      RECORDATORIO DE ENTRENAMIENTO
                    </p>

                  </td>
                </tr>

                <!-- BODY -->
                <tr>
                  <td style="padding:45px;">

                    <h2 style="
                      color:#FFFFFF;
                      margin-top:0;
                      font-size:32px;
                    ">
                      Hola ${usuario.nombreUsuario || 'Usuario'} 💪
                    </h2>

                    <p style="
                      color:#cfcfcf;
                      font-size:17px;
                      line-height:1.8;
                    ">
                      Tu rutina te está esperando.
                      Recuerda que cada entrenamiento te acerca más a tus objetivos.
                    </p>

                    <!-- STATS -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="
                      margin-top:35px;
                      background:#161616;
                      border-radius:20px;
                      border:1px solid #2a2a2a;
                    ">

                      <tr>
                        <td style="padding:35px;">

                          <h3 style="
                            color:#FF0000;
                            margin-top:0;
                            margin-bottom:25px;
                            font-size:24px;
                          ">
                            🔥 Tu progreso actual
                          </h3>

                          <p style="color:#FFFFFF;">
                            <strong>🎯 Objetivo:</strong>
                            ${usuario.objetivo}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>🏋️ Rutina:</strong>
                            ${usuario.rutinaActiva?.nombreLista || 'Sin rutina'}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>🔥 Calorías quemadas:</strong>
                            ${usuario.caloriasQuemadas}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>🏆 Trofeos:</strong>
                            ${usuario.trofeos}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>💎 Plan:</strong>
                            ${usuario.planAsociado?.nombrePlan}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>📅 Fecha:</strong>
                            ${fechaActual}
                          </p>

                          <p style="color:#FFFFFF;">
                            <strong>⏰ Hora:</strong>
                            ${hora}
                          </p>

                        </td>
                      </tr>

                    </table>

                    <!-- MOTIVATION -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="
                      margin-top:35px;
                      background:#220000;
                      border-left:6px solid #FF0000;
                      border-radius:20px;
                    ">

                      <tr>
                        <td style="padding:30px;">

                          <h2 style="
                            color:#FFFFFF;
                            margin:0;
                            font-size:28px;
                            line-height:1.6;
                          ">
                            ${mensajeRandom}
                          </h2>

                        </td>
                      </tr>

                    </table>

                    <!-- BUTTON -->
                    <div style="
                      text-align:center;
                      margin-top:45px;
                    ">

                      <a href="#"
                        style="
                          background:#FF0000;
                          color:#FFFFFF;
                          text-decoration:none;
                          padding:18px 45px;
                          border-radius:14px;
                          display:inline-block;
                          font-weight:bold;
                          font-size:18px;
                        ">
                        🏋️ ENTRENAR AHORA
                      </a>

                    </div>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="
                    background:#050505;
                    text-align:center;
                    padding:35px;
                  ">

                    <p style="
                      color:#777777;
                      margin:0;
                      font-size:14px;
                      line-height:1.8;
                    ">
                      FIT MANAGER © 2025
                      <br>
                      NO EXCUSAS • SOLO RESULTADOS
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      `;
    }
    await transporter.sendMail({
      from: `"FIT MANAGER" <${process.env.EMAIL}>`,
      to: usuario.correo,
      subject: asunto,
      html: contenidoHTML,
    });
    res.json({
      ok: true,
      mensaje: 'Correo enviado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error enviando correo',
    });
  }
});
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});