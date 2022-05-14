import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { insert } from "../../../db/Helper";


const register = async (username: string, password: string) => {

  const saltRounds: number = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  let columns: string[] = ['email', 'password'];
  let val: string[] = [username, hash];
  let result = await insert(columns, val, 'users');

  console.log(result);
  return result;
}

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {

  const result = await register(req.body.username, req.body.password);
  console.log(result);
  if(result.data) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result);
  }
  
}