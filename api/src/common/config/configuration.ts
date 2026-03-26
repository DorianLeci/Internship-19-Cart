const configuration = () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: Number.parseInt(process.env.PORT ?? '3000', 10),
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
});
export default configuration;
