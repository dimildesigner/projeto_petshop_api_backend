import bcrypt from "bcryptjs";

const senhaHash = bcrypt.hashSync("123456", 10);

export const users = [
  {
    id: 1,
    email: "admin@petshop.com",
    password: senhaHash,
    role: "admin"
  }
];
