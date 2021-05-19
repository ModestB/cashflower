module.exports = {
  migrateDatabaseUrl: process.env.MIGRATE_DB_URL,
  databaseUrl: process.env.MONGODB_URL,
  databaseName: process.env.MONGODB_NAME,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtLifeInSeconds: process.env.JWT_LIFE,
};
