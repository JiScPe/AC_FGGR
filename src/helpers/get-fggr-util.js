export async function getFGGR(connection, plant) {
  const sql = `SELECT
        row_id,
        product_code as 'FG',
        product_desc as 'FG_Desc',
        COUNT(barcode) as 'MES_Offline',
        SUM(CASE WHEN auto_flag = 1 THEN 1 ELSE 0 END) AS GR,
        SUM(CASE WHEN auto_flag = 0 THEN 1 ELSE 0 END) AS Diff
    FROM
        cosmo_wms_${plant}.ods_raw_offline_backflush AS MF
    WHERE
        DATE_FORMAT(created_date, '%Y-%m-%d') = CURDATE()
    GROUP BY
        product_code
    order by
        Diff DESC
    LIMIT 10;`;

  return await connection.query(sql);
}