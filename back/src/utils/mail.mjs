import nodemailer from "nodemailer";

function setMailOptions({ email, name, password }) {
  return {
    to: email,
    subject: "[미슐랭 먹을랭] 회원님의 임시 비밀번호 입니다.",
    html: `<h1>임시 비빌번호</h1>
          <div>
            안녕하세요. ${name} 님.
            아래의 비밀번호는 회원님께 발급된 임시 비밀번호입니다.

            <p style="font-weight: bold; background-color: powderblue;">${password}</p>

            로그인 후, 새로운 비밀번호로 변경해주세요.
          </div>`,
  };
}

function send({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // 이메일
      auth: {
        user: process.env.NODEMAILERL_ID,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    transporter.sendMail({
      from: process.env.NODEMAILERL_ID,
      to,
      subject,
      html,
    });
    return { msg: "임시 비밀번호를 전송하는 데 성공하였습니다." };
  } catch (error) {
    throw error;
  }
}

export { setMailOptions, send };
