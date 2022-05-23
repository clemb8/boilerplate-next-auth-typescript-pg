import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { get } from "../../../db/Helper";
import { Session } from "next-auth";

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
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      console.log('Token');
      return token
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      console.log('Session');
      if(token && token.sub) {
        session.user.id = token?.sub;
      }

      return session;
    }
  }

})