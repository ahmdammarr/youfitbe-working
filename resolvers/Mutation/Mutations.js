const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRETu, getUserId } = require("../../utils");
const nodemailer = require("nodemailer");

//User Related
async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRETu);
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let mail = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "ahmedmahmoud9597@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", mail.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return {
    token,
    user
  };
}
async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRETu);
  return {
    token,
    user
  };
}
async function updateUser(
  root,
  {
    id,
    firstName,
    lasttName,
    email,
    password,
    mobileOne,
    mobileTwo,
    City,
    address
  },
  context,
  info
) {
  const userId = getUserId(context);
  return context.prisma.updateUser({
    where: { id: userId },
    data: {
      firstName: firstName,
      lasttName: lasttName,
      email: email,
      password: password,
      mobileOne: mobileOne,
      mobileTwo: mobileTwo,
      City: City,
      address: address
    }
  });
}
//-------------------------------------------------------------

//Admins Related

async function signupAdmin(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const admin = await context.prisma.createAdmin({ ...args, password });
  const token = jwt.sign({ userId: admin.id }, APP_SECRETu);
  return {
    token,
    admin
  };
}

async function loginAdmin(parent, args, context, info) {
  const admin = await context.prisma.admin({ email: args.email });
  if (!admin) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, admin.password);
  if (!valid) {
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({ userId: admin.id }, APP_SECRETu);
  return {
    token,
    admin
  };
}

async function acceptAdmin(root, { id }, context, info) {
  return context.prisma.updateAdmin({
    where: { id },
    data: { accepted: true }
  });
}

//Testing and Trying

function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}

module.exports = {
  signup,
  login,
  updateUser,
  signupAdmin,
  loginAdmin,
  acceptAdmin,
  post
};
