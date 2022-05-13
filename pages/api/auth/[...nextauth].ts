import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import { Sequelize, DataTypes } from "sequelize";
import { get } from "../../../db/Helper";


// let sequelize: Sequelize;
// process.env.DATABASE_URL ? sequelize = new Sequelize(process.env.DATABASE_URL) : sequelize = new Sequelize("");
// //sequelize.sync();
// //console.log(sequelize.config);

export default NextAuth({
  // https://next-auth.js.org/providers/overview
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "text" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log("authorize");
        console.log(credentials);
        let values = [`id`, `email`, `password`];
        let filters = `email = '${credentials?.username}' AND password = '${credentials?.password}'`
        let result = await get('users', values, filters);
        console.log(result);

        if (result.data && result.data.length > 0) {
          // Any object returned will be saved in `user` property of the JWT
          const user = result.data[0];
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
      }
    })
  ],
  // adapter: SequelizeAdapter(sequelize, {
  //   models: {
  //     User: sequelize.define("userbis", {
  //       id: {
  //         type: DataTypes.UUID,
  //         primaryKey: true,
  //       },
  //       username: DataTypes.STRING,
  //       email: DataTypes.STRING,
  //       password: DataTypes.STRING,
  //     }),
  //   },
  // }),

})