---
id: build-sql
version: 2.0.0
agents: [database-engineer, domain-modeler]
prompts: [build-sql, write-schema, create-migration]
validators: [code-quality]
triggers: [phoenix/sql]
---

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

## Handoffs

- Domain Modeler → Database Engineer: entity definitions, relationships, cardinality, access patterns
- Database Engineer → Application Team: migration SQL, query examples, performance notes

## Validation Gates

- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Prettier format check passes
- [ ] Build succeeds

## Output

- Migration SQL (up/down)
- Seed data SQL
- Index recommendations
- Query examples
