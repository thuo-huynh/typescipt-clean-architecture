export interface ENV {
  HOST: string | undefined;
  PORT: number | undefined;
  NODE_ENV: string | undefined;
  CONTEXT_PATH: string | undefined;
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_DBNAME: string | undefined;
  DB_TYPE: 'postgres';
  JWT_SECRET_KEY: string | undefined;
}
