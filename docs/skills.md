# Talocode Skills API v0.1

The Talocode Skills API generates installable AI skills from GitHub profiles, repositories, documentation URLs, and raw text. These skills are compatible with Cursor, Claude Code, OpenCode, Codra, and other SKILL.md-compatible agent workflows.

Base URL: `https://api.talocode.site` (set `TALOCODE_BASE_URL` env var to override)

Auth: `Authorization: Bearer $TALOCODE_API_KEY`

## Namespace

All Skills API endpoints are under `/v1/skills/*`.

## Endpoints

### Generate from GitHub Profile

```
POST /v1/skills/generate/github-profile
```

Scrapes a public GitHub profile and generates a skill pack.

**Request:**
```json
{
  "username": "octocat",
  "target": "cursor",
  "focus": ["coding_style", "project_patterns", "product_context"],
  "includeRepositories": true,
  "maxRepositories": 8
}
```

**Response:**
```json
{
  "id": "skill_req_abc123",
  "object": "skills.generated",
  "source": { "type": "github_profile", "username": "octocat" },
  "skill": {
    "name": "octocat-github-profile",
    "title": "octocat GitHub Profile Skill",
    "description": "Skill pack generated from octocat's GitHub profile",
    "skillMd": "# octocat GitHub Profile Skill\n\n## Purpose\n...",
    "references": [],
    "metadata": {
      "sourceType": "github_profile",
      "target": "cursor",
      "generatedAt": "2026-07-01T00:00:00.000Z",
      "generator": "talocode-skills-api-v0.1"
    }
  },
  "exports": { "cursor": { "files": [{ "path": "SKILL.md", "content": "..." }] } },
  "usage": { "credits": 80, "action": "skills.generate.github_profile" }
}
```

**Credits:** 80

### Generate from GitHub Repository

```
POST /v1/skills/generate/github-repo
```

Analyzes a public GitHub repository and generates a skill pack.

**Request:**
```json
{
  "repoUrl": "https://github.com/talocode/codra",
  "target": "cursor",
  "focus": ["architecture", "commands", "coding_rules", "release_flow"]
}
```

**Credits:** 100

### Generate from Documentation URL

```
POST /v1/skills/generate/docs
```

Fetches documentation from a URL and generates a skill pack.

**Request:**
```json
{
  "url": "https://docs.example.com/api",
  "target": "cursor",
  "focus": ["api_usage", "integration_steps", "gotchas"]
}
```

**Credits:** 100

### Generate from Text

```
POST /v1/skills/generate/text
```

Generates a skill pack from raw text/context.

**Request:**
```json
{
  "name": "my-project",
  "content": "...",
  "target": "cursor",
  "focus": ["api", "sdk", "mcp"]
}
```

**Credits:** 40

### Export for Cursor

```
POST /v1/skills/export/cursor
```

Exports a generated skill as Cursor-compatible files.

**Request:**
```json
{
  "skill": { "name": "my-skill", "skillMd": "...", "metadata": {} }
}
```

**Credits:** 10

### Export for Claude Code

```
POST /v1/skills/export/claude
```

Exports a generated skill as Claude Code-compatible files.

**Request:**
```json
{
  "skill": { "name": "my-skill", "skillMd": "...", "metadata": {} }
}
```

**Credits:** 10

### Health

```
GET /v1/skills/health
```

Returns the health status of the Skills API.

## SDK Usage

```typescript
import { Talocode } from "@talocode/sdk";

const talocode = new Talocode();

// Generate skill from GitHub profile
const skill = await talocode.skills.generate.githubProfile({
  username: "octocat",
  target: "cursor"
});

// Generate skill from GitHub repository
const repoSkill = await talocode.skills.generate.githubRepo({
  repoUrl: "https://github.com/talocode/codra",
  target: "cursor"
});

// Generate skill from documentation
const docsSkill = await talocode.skills.generate.docs({
  url: "https://docs.example.com/api",
  target: "cursor"
});

// Generate skill from text
const textSkill = await talocode.skills.generate.text({
  name: "my-project",
  content: "Project context and patterns...",
  target: "cursor"
});

// Export for Cursor
const cursorExport = await talocode.skills.export.cursor({
  skill: { name: "my-skill", skillMd: "# My Skill", metadata: {} }
});

// Export for Claude Code
const claudeExport = await talocode.skills.export.claude({
  skill: { name: "my-skill", skillMd: "# My Skill", metadata: {} }
});
```

## MCP Tools

| Tool Name | Description | Credits |
|-----------|-------------|---------|
| `skills_generate_github_profile` | Generate a skill from a GitHub profile | 80 |
| `skills_generate_github_repo` | Generate a skill from a GitHub repo | 100 |
| `skills_generate_docs` | Generate a skill from a docs URL | 100 |
| `skills_generate_text` | Generate a skill from text | 40 |
| `skills_export_cursor` | Export a skill for Cursor | 10 |
| `skills_export_claude` | Export a skill for Claude Code | 10 |

## Pricing

| Action | Credits | USD Value |
|--------|---------|-----------|
| skills.generate.github_profile | 80 | $0.80 |
| skills.generate.github_repo | 100 | $1.00 |
| skills.generate.docs | 100 | $1.00 |
| skills.generate.text | 40 | $0.40 |
| skills.export.cursor | 10 | $0.10 |
| skills.export.claude | 10 | $0.10 |

## cURL Examples

```bash
# Generate skill from a GitHub repository
curl -X POST "$TALOCODE_BASE_URL/v1/skills/generate/github-repo" \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "repoUrl": "https://github.com/talocode/codra",
    "target": "cursor",
    "focus": ["architecture", "commands", "coding_rules"]
  }'

# Generate skill from text
curl -X POST "$TALOCODE_BASE_URL/v1/skills/generate/text" \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-project",
    "content": "Project description and patterns...",
    "target": "cursor"
  }'
```

## Notes

- Skills API v0.1 uses deterministic generation by default if no LLM provider is configured.
- Only public GitHub data is fetched. Private repository access requires a `GITHUB_TOKEN` environment variable.
- Docs URL fetching blocks private IPs and localhost.
- Generated skills follow the standard Skill Pack format and include SKILL.md with references.
