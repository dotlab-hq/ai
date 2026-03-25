import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config( { path: ['.env.local', '.env'] } )

export default defineConfig( {
  out: './drizzle',
  schema: './src/db/schema.ts',
  migrations: {
    schema: "__drizzle-ai"
  },
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },

  // verbose: true,
} )
