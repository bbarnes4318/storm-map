import { NextResponse } from "next/server";
import { fetchNwsAlerts } from "@/lib/weather/fetchNwsAlerts";
import { weatherCache } from "@/lib/weather/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const cacheKey = "nws-alerts-cache";
  // Cache active warnings for 90 seconds
  const cached = weatherCache.get<any>(cacheKey, 90);

  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "Cache-Control": "public, max-age=90",
        "X-Cache-Status": "HIT",
      },
    });
  }

  try {
    const alerts = await fetchNwsAlerts();
    weatherCache.set(cacheKey, alerts);

    return NextResponse.json(alerts, {
      headers: {
        "Cache-Control": "public, max-age=90",
        "X-Cache-Status": "MISS",
      },
    });
  } catch (error: any) {
    console.error("API Alerts Route Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch active alerts from NOAA/NWS API.", details: error.message },
      { status: 500 }
    );
  }
}
