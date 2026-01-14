const BASEROW_API_URL = 'https://api.baserow.io/api/database/rows/table';

export async function findUserByUsername(
  tableId: number,
  username: string,
  token: string
) {
  const res = await fetch(
    `${BASEROW_API_URL}/${tableId}/?user_field_names=true&filter__username__equal=${username}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error('Baserow error');

  const data = await res.json();
  return data.results?.[0] || null;
}

export async function createUser(
  tableId: number,
  body: any,
  token: string
) {
  const res = await fetch(
    `${BASEROW_API_URL}/${tableId}/?user_field_names=true`,
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return await res.json();
}
