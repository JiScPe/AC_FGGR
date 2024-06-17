import { connectDatabase } from "@/helpers/db-util";
import { getFGGR } from "@/helpers/get-fggr-util";
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

    try {
      const [rows] = await getFGGR(connection, plant);
      const queryRes = rows
      return NextResponse.json(queryRes, { status: 200 });
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
