# Workflow: Build SQL

## Trigger

Issue labeled `phoenix/sql`

## Steps

1. Load prompt: `.ai/prompts/build-sql.md`
2. Analyze data requirements and existing schema
3. Design schema changes, queries, indexes
4. Call DeepSeek API
5. Output migration files
6. Validate SQL syntax
7. Store in `04-database/migrations/`

## Output

- Migration SQL (up/down)
- Seed data SQL
- Index recommendations
- Query examples
