import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import EmailProvider from 'next-auth/providers/email';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from 'next-auth/providers/google';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const mongoClient = await clientPromise;

  return NextAuth(req, res, {
    // Configure one or more authentication providers
    session: {
      jwt: true,
    },
    adapter: MongoDBAdapter({
      db: () => mongoClient.db(process.env.MONGODB_AUTH_DATABASE),
      ObjectId
    }),
    pages: {
      signIn: '/auth/login',
    },
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: { user: process.env.EMAIL_SERVER_USER, pass: process.env.EMAIL_SERVER_PASSWORD },
        },
        from: process.env.EMAIL_FROM,
        // sendVerificationRequest({ ... }) { ... } // For customizing emails, visit https://next-auth.js.org/providers/email
        // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
      }),
      FacebookProvider({
        // @ts-ignore
        clientId: process.env.FACEBOOK_CLIENT_ID,
        // @ts-ignore
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
      GoogleProvider({
        // @ts-ignore
        clientId: process.env.GOOGLE_CLIENT_ID,
        // @ts-ignore
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // ...add more providers here
    ],
  });
}
