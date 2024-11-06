import mysql from "mysql2/promise";

// DotEnv로 중요 데이터 보호 필요
// sql 폴더의 the_compass.sql 파일을 실행하면 테스트해볼 수 있습니다.
const connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "the_compass",
});

export default connection;
