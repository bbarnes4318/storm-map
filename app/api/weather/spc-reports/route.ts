import { NextResponse } from "next/server";
import { fetchSpcReports } from "@/lib/weather/fetchSpcReports";
import { weatherCache } from "@/lib/weather/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeWindow = (searchParams.get("timeWindow") as any) || "24h";
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;

  const cacheKey = `spc-reports-cache-${timeWindow}-${startDate || "none"}-${endDate || "none"}`;
  
  // Cache SPC storm reports combined results for 5 minutes (300 seconds)
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
    const reports = await fetchSpcReports({ timeWindow, startDate, endDate });
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
