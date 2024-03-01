import mysql from "mysql2/promise";

export async function connectDatabase() {
  const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD } =
    process.env;
  return await mysql.createConnection({
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
  });
}