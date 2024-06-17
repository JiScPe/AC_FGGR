import { connectDatabase } from "@/helpers/db-util";
import { getFGNotGR } from "@/helpers/fg-notgr-util";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const plant = req.nextUrl.searchParams.get('plant')
  let connection;
  //Connect database
  try {
    connection = await connectDatabase();
    connection.connect();
    // console.log("Connected to Database Successfully");

    //Query fg offline data
    try {
      const [rows] = await getFGNotGR(connection, plant);
      const queryResults = rows;
      return NextResponse.json(queryResults, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Query Failed!", error },
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
