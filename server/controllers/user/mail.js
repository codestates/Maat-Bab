require('dotenv').config();

module.exports = {
  email: {
    post: (req, res) => {
      const nodemailer = require('nodemailer');

      const transporter = {
        service: 'Gmail',
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      };

      const { email } = req.params;
      const { certificationCode } = req.body;
      console.log(certificationCode)
      if (!email || !certificationCode) {
        return res.status(400).send('Check email or certificationCode');
      }

      const send = async (content) => {
        nodemailer
          .createTransport(transporter)
          .sendMail(content, (err, info) => {
            if (err) {
              console.log(err);
              return res.status(500).send('Internal Server Error');
            }
            console.log(info);
            return res.status(200).send({ email, certificationCode });
          });
      };

      const content = {
        from: 'devchild5787@gmail.com',
        to: email,
        subject: '[ Maat-Bab ] 인증 메일입니다.',
        text: '',
        html: `<table
        style="background-color: white; border: 1px solid #c7c7c7"
        width="600px"
        height="80%"
      >
        <tr width="90%" height="90%">
          <td rowspan="100" width="50px"></td>
          <td>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              width="100%"
              height="350px"
              cellspacing="0"
              style="padding-top: 50px"
            >
              <tr height="60px">
                <td valign="top">
                  <img
                  src=https://cdn.discordapp.com/attachments/894776803284107355/901301212752801792/image0.png
                  width="50px">
                </td>
              </tr>
              <tr height="40px">
                <td valign="bottom">
                  <span style="font-size: 40px; font-weight: 650"> 맞밥에서 </span>
                  <span style="font-size: 40px; font-weight: 650; color: orange">
                    인증코드
                  </span>
                  <span style="font-size: 40px; font-weight: 650">를</span>
                </td>
              </tr>
              <tr height="25px">
                <td style="font-size: 40px; font-weight: 650" valign="top">
                  안내 드립니다
                </td>
              </tr>
              <tr height="25px"></tr>
              <tr height="30px">
                <td
                  style="font-size: 20px; font-weight: 530; color: orange"
                  valign="top"
                >
                  안녕하세요 회원님,
                </td>
              </tr>
              <tr height="35px">
                <td
                  style="font-size: 16px; color: #7b7b7b; font-weight: 450"
                  valign="bottom"
                >
                  맞밥 이메일 인증을 위한 인증번호가 발급되었습니다.
                </td>
              </tr>
              <tr
                style="font-size: 16px; color: #7b7b7b; font-weight: 450"
                valign="top"
                height="60px"
              >
                <td>아래의 인증번호를 복사하여 이메일 인증을 완료해주세요.</td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              width="100%"
              height="60px"
            >
              <tr>
                <td
                  style="
                    background-color: orange;
                    font-size: 19px;
                    color: white;
                    font-weight: 530;
                  "
                  width="110px"
                  align="center"
                >
                  이메일 인증번호
                </td>
                <td style="background-color: #fff0cb; font-size: 19px; font-weight: 530" width="200px" align="center">
                  ${certificationCode}
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              width="100%"
              height="180px"
              style="padding-bottom: 50px"
            >
              <tr>
                <td style="color: #7b7b7b; font-weight: 350" valign="bottom">
                  › 인증번호를 드래그하여 복사하거나 직접 입력해주세요.
                </td>
              </tr>
              <tr>
                <td valign="top" height="10px"></td>
              </tr>
              <tr>
                <td style="color: #7b7b7b; font-weight: 350" valign="top">
                  › 개인정보 보호를 위해 이메일 인증번호는 5분간 유효합니다.
                </td>
              </tr>
              <tr>
                <td
                  style="color: red; font-weight: 350"
                  height="60px"
                  valign="bottom"
                >
                  발신전용 메일입니다.
                </td>
              </tr>
            </table>
          </td>
          <td rowspan="100" width="50px"></td>
        </tr>
      </table>`,
      };

      return send(content);
    },
  },
};
