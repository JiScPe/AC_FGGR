export async function getFGNotGR(connection, plant) {
  const sql = `select 
      product_code,
      barcode
    from cosmo_wms_${plant}.ods_raw_offline_backflush as MF
    where 1=1
    and auto_flag = 0
    and date_format(created_date, '%Y-%m-%d')  = curdate()`;
  return await connection.query(sql);
}