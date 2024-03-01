import { connectDatabase } from "@/helpers/db-util";
import { getFGGRRate } from "@/helpers/fggr-rate";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const date_range = [start_date, end_date];
  let connection;
  // Connect database
  try {
    connection = await connectDatabase();
    connection.connect();
    // console.log("Connected to Database Successfully");
    try {
      // Check if date_range is provided
      if (!start_date || !end_date) {
        throw new Error("Date range is required!");
      }

      const [rows] = await getFGGRRate(connection, date_range);
      const queryRes = rows;
      return NextResponse.json(queryRes, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Query Failed!", error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Database connection failed", error },
      { status: 500 }
    );
  } finally {
    connection.destroy();
  }
}
