import { NextResponse } from "next/server";
import { fetchSpcReports } from "@/lib/weather/fetchSpcReports";
import { weatherCache } from "@/lib/weather/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const cacheKey = "spc-reports-cache";
  // Cache SPC storm reports for 5 minutes (300 seconds)
  const cached = weatherCache.get<any>(cacheKey, 300);

  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "X-Cache-Status": "HIT",
      },
    });
  }

  try {
    const reports = await fetchSpcReports();
    weatherCache.set(cacheKey, reports);

    return NextResponse.json(reports, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "X-Cache-Status": "MISS",
      },
    });
  } catch (error: any) {
    console.error("API SPC Reports Route Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch storm reports from NOAA SPC.", details: error.message },
      { status: 500 }
    );
  }
}
