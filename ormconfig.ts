const databaseConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: ['build/src/entity/**/*.js'],
  migrations: ['build/src/migration/**/*.js'],
  subscribers: ['build/src/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  dropSchema: false,
}

module.exports = databaseConfig
