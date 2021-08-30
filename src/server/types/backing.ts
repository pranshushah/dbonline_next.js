import { Prisma, PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';

export type ContextType = {
  prisma: PrismaClient;
  req: IncomingMessage;
  res: ServerResponse;
};

export type User = {
  id: string;
  email: string;
  name: string;
  photo: string;
};

export type Database = {
  id: string;
  databaseName: string;
  mainTableDetails: Prisma.JsonValue;
  tableDndDetails: Prisma.JsonValue;
  databaseType: 'oracle' | 'postgresql' | 'mysql';
  createdAt: string;
  modifiedAt: string;
  originalAuthorId?: string;
  authorId: string;
  views: number;
  numberOfForks: number;
};
