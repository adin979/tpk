
type FetchOptions = Omit<RequestInit, 'body'> & {
    body?: unknown
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL
// const BASE_URL = 'http://localhost:3001'

export default async function customFetch(url: string, options: FetchOptions = {}) {
    const { body, headers: requestHeaders, ...rest } = options
    const headers = new Headers(requestHeaders)
    headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`)
    const serializedBody = body !== undefined && body !== null ?body instanceof FormData?body: JSON.stringify(body) : undefined;
    if(!(serializedBody instanceof FormData))headers.set('Content-type','application/json')
    let response =await fetch(`${BASE_URL}${url}`, {
        ...rest,
        headers,
        credentials: 'include',
        ...(serializedBody !== undefined ? { body: serializedBody } : {})
    })
        if (response.status === 401 || response.status === 403) {
            const newAccessToken =await refreshToken()
            headers.set('Authorization', `Bearer ${newAccessToken}`)
            response = await fetch(`${BASE_URL}${url}`, {
            ...rest,
            headers,
            credentials: 'include',
            ...(serializedBody !== undefined ? { body: serializedBody } : {})
            })
        }
        return await response.json();
}

function refreshToken() {
    return fetch(`${BASE_URL}/refresh-token`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) =>{localStorage.setItem('token',data.accessToken);return data.accessToken})
}