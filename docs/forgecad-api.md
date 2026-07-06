# ForgeCAD Cloud API

Local-first CAD workflow for parametric OpenSCAD scripts, BOMs, cut lists, and design reports.

**Base URL:** `https://api.talocode.site`  
**Namespace:** `/v1/forgecad/*`  
**Auth:** `Authorization: Bearer $TALOCODE_API_KEY`

> Not certified engineering software. All outputs require human engineering review.

## Endpoints

| Method | Path | Credits |
|--------|------|---------|
| GET | `/v1/forgecad/health` | — |
| POST | `/v1/forgecad/design/generate` | 60 |
| POST | `/v1/forgecad/openscad/generate` | 40 |
| POST | `/v1/forgecad/bom/generate` | 20 |
| POST | `/v1/forgecad/cutlist/generate` | 20 |
| POST | `/v1/forgecad/assembly/plan` | 25 |
| POST | `/v1/forgecad/printability/check` | 25 |
| POST | `/v1/forgecad/manufacturability/check` | 30 |
| POST | `/v1/forgecad/design/review` | 40 |
| POST | `/v1/forgecad/material/estimate` | 20 |
| POST | `/v1/forgecad/tools/detect` | 5 |
| POST | `/v1/forgecad/render/openscad` | 80 |
| POST | `/v1/forgecad/export/markdown` | 5 |
| POST | `/v1/forgecad/export/json` | 5 |

## SDK

```ts
import { Talocode } from '@talocode/sdk'

const talocode = new Talocode({ apiKey: process.env.TALOCODE_API_KEY })

const design = await talocode.forgecad.design.generate({
  projectType: 'enclosure',
  description: 'Arduino electronics enclosure',
  dimensions: { length: 120, width: 80, height: 40, unit: 'mm' },
  manufacturingMethod: 'fdm_3d_printing',
  material: 'PETG',
})
```

## Standalone package

```bash
npm install @talocode/forgecad
npx forgecad generate --type enclosure --description "Arduino enclosure" --length 120 --width 80 --height 40 --unit mm --material PETG
```

## Limitations

- Not certified for structural, medical, or safety-critical use
- No FEA/CFD validation
- OpenSCAD rendering requires external tool installation
- Generated designs are drafts for human review