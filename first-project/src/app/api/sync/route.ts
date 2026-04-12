import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const HEADERS = { Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}` };
const PAGES_TO_FETCH = 10; // 10 pages = 200 items per type

async function fetchTMDBPage(type: 'movie' | 'tv', page: number) {
  const endpoint = type === 'movie' ? '/discover/movie' : '/discover/tv';
  const res = await fetch(`${TMDB_BASE}${endpoint}?page=${page}&sort_by=popularity.desc`, {
    headers: HEADERS,
  });
  return res.json();
}

export async function GET(request: NextRequest) {
  const results = { inserted: 0, errors: 0 };

  for (const type of ['movie', 'tv'] as const) {
    for (let page = 1; page <= PAGES_TO_FETCH; page++) {
      const data = await fetchTMDBPage(type, page);

      if (!data.results) continue;

      const records = data.results.map((item: any) => ({
        tmdb_id: item.id,
        type,
        title: type === 'movie' ? item.title : item.name,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        vote_count: item.vote_count,
        popularity: item.popularity,
        overview: item.overview,
        release_date: type === 'movie' ? item.release_date : item.first_air_date,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('media')
        .upsert(records, { onConflict: 'tmdb_id' });

      if (error) {
        console.error(`Error upserting page ${page} of ${type}:`, error);
        results.errors++;
      } else {
        results.inserted += records.length;
      }
    }
  }

  return NextResponse.json({ success: true, ...results });
}
