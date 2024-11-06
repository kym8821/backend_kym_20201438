// transaction template method
export async function transactionManager(connection, method, props) {
  let conn = undefined;
  let ret = undefined;
  try {
    conn = await connection.getConnection();
    await conn.beginTransaction();
    ret = await method(conn, ...props);
    if (conn) await conn.commit();
  } catch (err) {
    console.log(err);
    if (conn) await conn.rollback();
  } finally {
    if (conn) conn.release();
  }
  return ret;
}
