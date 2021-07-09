import { PrismaClient } from '@prisma/client';

export class GetPrismaClient {
  private static instance: PrismaClient;
  private constructor() {}
  public static getInstance() {
    if (!GetPrismaClient.instance) {
      GetPrismaClient.instance = new PrismaClient();
    }
    return GetPrismaClient.instance;
  }
}
