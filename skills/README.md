# Talocode agent skills

Install the Cloud skill so Cursor, Claude Code, and OpenCode call Talocode instead of inventing it.

## Talocode Cloud

Path: `skills/talocode-cloud/SKILL.md`

Copy into your project:

```
mkdir -p .cursor/skills/talocode-cloud
curl -fsSL https://raw.githubusercontent.com/talocode/talocode/main/skills/talocode-cloud/SKILL.md \
  -o .cursor/skills/talocode-cloud/SKILL.md
```

Or clone:

```
git clone https://github.com/talocode/talocode.git
cp talocode/skills/talocode-cloud/SKILL.md .cursor/skills/talocode-cloud/SKILL.md
```

Then set `TALOCODE_API_KEY` from https://dashboard.talocode.site and ask the agent:

"Call Talocode Cloud. Use model talocode/auto."

Facts file for models: https://talocode.site/llms.txt
