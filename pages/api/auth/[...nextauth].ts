import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
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
        let filters = `email = '${credentials?.username}'`
        let result = await get('users', values, filters);

        if (result.data && result.data.length > 0 && credentials) {

          console.log(result.data[0].password);
          const verified = await bcrypt.compare(credentials.password, result.data[0].password);
          console.log(verified);
          // Any object returned will be saved in `user` property of the JWT
          if(verified) {
            const user = result.data[0];
            return user
          } else {
            return null;
          }
          
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