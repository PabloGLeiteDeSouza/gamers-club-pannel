import { Awaitable } from "next-auth";
import { AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from "next-auth/adapters";
import { PrismaClient } from "prisma/prisma-client";

export class PrismaAdapter {
    
    protected prisma: PrismaClient;
    
    constructor(prisma: PrismaClient){
        this.prisma = prisma;
    }

    createUser(data: Omit<AdapterUser, "id">): Awaitable<AdapterUser> {
        
        return this.prisma.user.create({ data })
    }
    getUser(id: string): Awaitable<AdapterUser | null> {
        return this.prisma.user.findUnique({ where: { id } })
    }
    getUserByEmail(email: string): Awaitable<AdapterUser | null> {
        return this.prisma.user.findUnique({ where: { email } })
    }
    async getUserByAccount(provider_providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">) {
        const account = await this.prisma.account.findUnique({
            where: { provider_providerAccountId },
            select: { user: true },
        });
        return (account as Awaitable<AdapterUser | null>);
    }
    updateUser({ id, ...data }: Partial<AdapterUser> & Pick<AdapterUser, "id">) {
        return this.prisma.user.update({ where: { id }, data })
    }
    deleteUser(id: string) {
        return this.prisma.user.delete({ where: { id } })
    }
    linkAccount(data: AdapterAccount): Promise<void> | Awaitable<AdapterAccount | null | undefined> {
        return (this.prisma.account.create({ data }) as Promise<void> | Awaitable<AdapterAccount | null | undefined>)
    }
    unlinkAccount(provider_providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">){
        return (this.prisma.account.delete({
            where: { provider_providerAccountId },
        }) as Promise<void> | Awaitable<AdapterAccount | undefined>)
    }
    async getSessionAndUser(sessionToken: string) {
        const userAndSession = await this.prisma.session.findUnique({
            where: { sessionToken },
            include: { user: true },
        });
        if (!userAndSession)
            return null;
        const { user, ...session } = userAndSession;
        return { user, session };
    }
    createSession(data: {
        sessionToken: string
        userId: string
        expires: Date
      }) {
        return this.prisma.session.create({ data })
    }
    updateSession(data: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">) { 
        return this.prisma.session.update({ where: { sessionToken: data.sessionToken }, data })
    }
    deleteSession(sessionToken: string) { 
        return this.prisma.session.delete({ where: { sessionToken } })
    }
    async createVerificationToken(data: VerificationToken) {
        const verificationToken = await this.prisma.verificationToken.create({ data });
        if (verificationToken.id)
            delete verificationToken.id;
        return verificationToken;
    }
    async useVerificationToken(identifier_token: {
        identifier: string
        token: string
      }) {
        try {
            const verificationToken = await this.prisma.verificationToken.delete({
                where: { identifier_token },
            });
            if (verificationToken.id)
                delete verificationToken.id;
            return verificationToken;
        }
        catch (error) {
            // If token already used/deleted, just return null
            // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
            if (error.code === "P2025")
                return null;
            throw error;
        }
    }
}