const TOOLS = [
  { name: 'skills.generate', description: 'Generate a skill pack from text, a repo, or a profile.' },
  { name: 'chat.complete', description: 'Call Talocode Cloud chat completions.' },
  { name: 'coding.write', description: 'Call the coding product API.' },
]

export default async (request) => {
  const body = await request.json().catch(() => ({}))
  if (body.method === 'tools/list') return Response.json({ jsonrpc: '2.0', id: body.id, result: { tools: TOOLS } })
  if (body.method === 'tools/call') {
    const auth = request.headers.get('authorization')
    if (!auth) return Response.json({ jsonrpc: '2.0', id: body.id, error: { message: 'Connect and agree before calling a product API.' } }, { status: 401 })
    const name = body.params?.name
    const path = name === 'chat.complete' ? '/v1/chat/completions' : '/v1/skills/generate/text'
    const upstream = await fetch('https://api.talocode.site' + path, { method: 'POST', headers: { authorization: auth, 'content-type': 'application/json' }, body: JSON.stringify(body.params?.arguments || {}) })
    const text = await upstream.text()
    return Response.json({ jsonrpc: '2.0', id: body.id, result: { content: [{ type: 'text', text }] } })
  }
  return Response.json({ jsonrpc: '2.0', id: body.id ?? null, result: { server: 'talocode-cloud', mcp: 'https://dashboard.talocode.site/.netlify/functions/mcp' } })
}
