# Online AI Masters — Supabase/Postgres wired starter

This version is fully wired for:
- Supabase client usage
- Postgres schema + import scripts
- local fallback dataset for development
- outbound official school links via `/out/[slug]`

## Bundled data
- verified fallback rows: 36

## Run
```
npm install
cp .env.example .env.local
npm run dev
```

## Database setup
1. Run `database/schema.sql`
2. Import `database/seed_programs.csv` into `programs_import_stage` using the command inside `database/import.sql`
3. Run `database/import.sql`
4. Run `database/views.sql`
5. Set `USE_LOCAL_JSON_FALLBACK=false`

## Honest note
This package uses the currently available verified seed file, so the bundled fallback dataset contains 36 rows rather than the larger 50-row normalized set discussed earlier.
