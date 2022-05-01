import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import { Sequelize, DataTypes } from "sequelize";


let sequelize: Sequelize;
process.env.DATABASE_URL ? sequelize = new Sequelize(process.env.DATABASE_URL) : sequelize = new Sequelize("");

console.log(sequelize.config);

export default NextAuth({
  // https://next-auth.js.org/providers/overview
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log("authorize");
        console.log(credentials);
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define("user", {
        ...models.User,
        password: DataTypes.STRING,
      }),
    },
  }),

  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
})