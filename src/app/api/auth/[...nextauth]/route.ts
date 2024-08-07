import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { DiscordProfile } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT as string,
      clientSecret: process.env.DISCORD_SECRET as string,
      async profile(profile: DiscordProfile, tokens) {
        const discord_id: string = profile.id;
        const discord_avatar = `${process.env.DISCORD_CDN_URL}/avatars/${profile.id}/${profile.avatar}.jpg`;
        const usuario = profile.username;
        const email = profile.email;
        const object_profile_discord = JSON.stringify(profile);

        // Verificar se o usuário já existe no banco de dados
        const user = await prisma.users.findFirst({ where: { discord_id } });
        if (user) {
          return { id: String(user.id), email: user.email, image: user.discord_avatar, name: user.nome };
        }
        const usr = await prisma.users.create({
          data: {
            discord_id,
            discord_avatar,
            createdAt: new Date(),
            updatedAt: new Date(),
            email,
            usuario,
            object_profile_discord,
          },
        });
        return { id: String(usr.id), email: usr.email, image: usr.discord_avatar };
      },
    }),
  ],
  callbacks: {
    async signIn({user}) {
      console.log("passou")
      const userExists = await prisma.users.findFirst({ where: { id: Number(user.id) }});
      if (userExists?.nome) {
        console.log("deu bom")
        return true;
      } else {
        console.log("errou")
        return "/registro";
      }
    },
  },
  pages: {
  },
});


export { handler as GET, handler as POST }