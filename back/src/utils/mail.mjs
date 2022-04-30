import nodemailer from "nodemailer";

const mailOptions = {
  from: process.env.NODEMAILERL_ID,
  to: email,
  subject: "[미슐랭 먹을랭] 회원님의 임시 비밀번호 입니다.",
  html: `<h1>임시 비빌번호</h1>
          <div>
            안녕하세요. ${user.name} 님.
            아래의 비밀번호는 회원님께 발급된 임시 비밀번호입니다.

            <p style="font-weight: bold"></p>

            임시 비밀번호로 로그인하신 후, 비밀번호를 변경해주세요.
          </div>`,
  text: "임시 비밀번호 입니다.",
};

function send({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // 이메일
      auth: {
        user: process.env.NODEMAILERL_ID,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
        from: process.env.NODEMAILERL_ID,
        to: to,
        subject: subject,
        html: html
    });
    console.log(info);
  } catch (error) {
      console.log(error);
  }
}

export { send };