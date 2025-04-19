export default async function oauthRoute(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return new Response("Authorization failed: " + error, {
      status: 400,
    });
  }

  if (!code) {
    return new Response("Authorization code not found.", {
      status: 400,
    });
  }

  return new Response(`Authorization Code: ${code}`, {
    status: 200,
    headers: {
      "content-type": "text/plain",
    },
  });
}
