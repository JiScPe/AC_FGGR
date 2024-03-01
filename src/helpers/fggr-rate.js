export async function getFGGRRate(connection, date_range) {
  const sql = `SELECT 
        DATE_FORMAT(created_date, '%Y-%m-%d') AS Created_Date,
        COUNT(barcode) AS MesOffline,
        SUM(CASE WHEN auto_flag = 0 THEN 1 ELSE 0 END) AS NotInbound,
        SUM(CASE WHEN auto_flag = 1 THEN 1 ELSE 0 END) AS Inbound,
        SUM(CASE WHEN quality_status = 1 THEN 1 ELSE 0 END) AS Locked,
        COUNT(IF(HOUR(TIMEDIFF(last_upd_date, created_date)) > 24, 1, NULL)) AS Not_GR_in_Day
    FROM
        cosmo_wms_9774.ods_raw_offline_backflush AS MF
    WHERE
        created_date >= '${date_range[0]}' and created_date <= '${date_range[1]}'
    GROUP BY
        DATE_FORMAT(created_date, '%Y-%m-%d')
    ORDER BY Created_Date;`;

  return await connection.query(sql);
}
