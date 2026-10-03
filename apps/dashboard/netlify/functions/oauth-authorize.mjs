export default async (request) => {
  const url = new URL(request.url)
  const redirectUri = url.searchParams.get('redirect_uri') || 'https://teraai.chat/api/connectors/callback'
  const state = url.searchParams.get('state') || 'skills'
  if (url.searchParams.get('agree') === '0') {
    return Response.redirect('https://dashboard.talocode.site/oauth/error', 302)
  }
  if (url.searchParams.get('agree') === '1') {
    const next = new URL(redirectUri)
    next.searchParams.set('code', crypto.randomUUID())
    next.searchParams.set('state', state)
    return Response.redirect(next, 302)
  }
  const agree = new URL(request.url)
  agree.searchParams.set('agree', '1')
  const decline = new URL(request.url)
  decline.searchParams.set('agree', '0')
  return new Response(`<!doctype html><meta charset="utf-8"><title>Allow Tera</title><body style="font-family:Georgia,serif;background:#0c0c0c;color:#f5f5f5;margin:0"><main style="max-width:520px;margin:12vh auto;padding:24px"><h1>Allow Tera to use Talocode Cloud</h1><p>Skills will call product APIs on this account. You can decline.</p><p><a href="${agree}" style="color:#fff">Agree</a> · <a href="${decline}" style="color:#aaa">Decline</a></p></main>`, { headers: { 'content-type': 'text/html' } })
}
