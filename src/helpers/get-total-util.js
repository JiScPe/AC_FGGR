export async function getTotal(connection) {
  const sql = `SELECT 
    COUNT(barcode) AS MesOffline,
    SUM(CASE WHEN auto_flag = 0 THEN 1 ELSE 0 END) AS NotInbound,
    SUM(CASE WHEN auto_flag = 1 THEN 1 ELSE 0 END) AS Inbound
  FROM cosmo_wms_9774.ods_raw_offline_backflush AS MF
  WHERE DATE_FORMAT(created_date, '%Y-%m-%d') = CURDATE();`;
  return await connection.query(sql);
}
