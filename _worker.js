// worker.js (Corrected Version)

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  let path = url.pathname

  if (path === '/') {
    path = '/index.html'
  }

  try {
    const assetUrl = new URL(path, request.url)
    const response = await fetch(assetUrl)
    
    if (response.ok) {
      return response
    }
    
    throw new Error('Asset not found')

  } catch (e) {
    return new Response(`404 - Page Not Found. Could not find: ${path}`, {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/html'
      }
    })
  }
}