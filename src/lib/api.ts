const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
      ...options,
    });

    if (!res.ok) {
      console.error(`API error: ${res.status} for ${endpoint}`);
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return null;
  }
}

export async function postAPI(endpoint: string, body: any) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error(`Post error for ${endpoint}:`, error);
    return null;
  }
}
