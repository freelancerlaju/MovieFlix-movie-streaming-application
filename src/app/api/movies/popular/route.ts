import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";

  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", page);

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_KEY}`,
    },
    next: {
      revalidate: 60 * 60,
    },
  };

  try {
    const response = await fetch(url.toString(), options);
    const data = await response.json();
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return NextResponse.json([], { status: 500 });
  }
}
