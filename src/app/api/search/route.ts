import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    url.searchParams.set("query", query);
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_KEY}`,
      },
      next: {
        revalidate: 60 * 60, // Cache for 1 hour
      },
    };

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      console.error("TMDB API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: `TMDB API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      `Search for "${query}" returned ${data.results?.length || 0} results`
    );

    return NextResponse.json(data.results || []);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 }
    );
  }
}
