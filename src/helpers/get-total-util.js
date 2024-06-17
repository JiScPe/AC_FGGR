export async function getTotal(connection, plant) {
  const sql = `SELECT 
    COUNT(barcode) AS MesOffline,
    SUM(CASE WHEN auto_flag = 0 THEN 1 ELSE 0 END) AS NotInbound,
    SUM(CASE WHEN auto_flag = 1 THEN 1 ELSE 0 END) AS Inbound
  FROM cosmo_wms_${plant}.ods_raw_offline_backflush AS MF
  WHERE DATE_FORMAT(created_date, '%Y-%m-%d') = CURDATE();`;
  return await connection.query(sql);
}
