export default async function oauthRoute(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return new Response("Authorization failed: " + error, { status: 400 });
  }

  if (!code) {
    return new Response("Authorization code not found.", { status: 400 });
  }

  const client_id = "1dad872b-594c-8092-85ca-003776aecd64";
  const client_secret = "secret_WTaxYOJFhPD2n5vFJBIZH0SP5W4X0XssWX38w1AHAbq";
  const redirect_uri = "https://saintcore.studio/oauth/callback";

  const tokenResponse = await fetch("https://api.notion.com/v1/oauth/token", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return new Response("Token exchange failed: " + JSON.stringify(tokenData), { status: 500 });
  }

  return new Response(
  `Access Token received!\nAccess Token: ${tokenData.access_token}\nBot ID: ${tokenData.bot_id}`,
  {
    status: 200,
    headers: { "content-type": "text/plain" },
  }
);
