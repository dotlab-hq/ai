import { serial, text, timestamp, boolean, PgSchema } from 'drizzle-orm/pg-core'

export const schema = new PgSchema( 'ai' )

// User and authentication tables for Better Auth
export const users = schema.table( 'user', {
  id: text().primaryKey(),
  name: text(),
  email: text().unique().notNull(),
  emailVerified: boolean( 'email_verified' ).default( false ),
  image: text(),
  createdAt: timestamp( 'created_at' ).defaultNow(),
  updatedAt: timestamp( 'updated_at' ).defaultNow(),
} )

export const sessions = schema.table( 'session', {
  id: text().primaryKey(),
  userId: text( 'user_id' )
    .notNull()
    .references( () => users.id, { onDelete: 'cascade' } ),
  token: text().notNull().unique(),
  expiresAt: timestamp( 'expires_at' ).notNull(),
  ipAddress: text( 'ip_address' ),
  userAgent: text( 'user_agent' ),
  createdAt: timestamp( 'created_at' ).defaultNow(),
  updatedAt: timestamp( 'updated_at' ).defaultNow(),
} )

export const accounts = schema.table( 'account', {
  id: text().primaryKey(),
  userId: text( 'user_id' )
    .notNull()
    .references( () => users.id, { onDelete: 'cascade' } ),
  accountId: text( 'account_id' ).notNull(),
  provider: text().notNull(),
  providerAccountId: text( 'provider_account_id' ).notNull(),
  refreshToken: text( 'refresh_token' ),
  accessToken: text( 'access_token' ),
  accessTokenExpiresAt: timestamp( 'access_token_expires_at' ),
  refreshTokenExpiresAt: timestamp( 'refresh_token_expires_at' ),
  scope: text(),
  password: text(),
  createdAt: timestamp( 'created_at' ).defaultNow(),
  updatedAt: timestamp( 'updated_at' ).defaultNow(),
} )

export const verifications = schema.table( 'verification', {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp( 'expires_at' ).notNull(),
  createdAt: timestamp( 'created_at' ).defaultNow(),
  updatedAt: timestamp( 'updated_at' ).defaultNow(),
} )

// Todos table
export const todos = schema.table( 'todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp( 'created_at' ).defaultNow(),
} )
