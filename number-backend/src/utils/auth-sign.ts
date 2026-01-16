const encoder = new TextEncoder()

export async function hmacSign(secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  )

  return btoa(String.fromCharCode(...new Uint8Array(sig)))
}
