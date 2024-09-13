const endpoint = `${process.env.NEXT_PUBLIC_APP_SERVER}/api/v1`
const headers = {
    accept: 'application/json',
    'content-type': 'application/json'
}

async function get(path: string, fetchFnc: typeof fetch) {
    const resp = await fetchFnc(`${endpoint}${path}`, {
        method: 'GET',
        headers,
        cache: 'no-store'
    })

    const body = await resp.json()
    return body
}

async function post(path: string, args: Object, fetchFnc: typeof fetch) {
    const resp = await fetchFnc(`${endpoint}${path}`, {
        method: 'POST',
        body: JSON.stringify(args || {}),
        headers
    })

    const body = await resp.json()
    return body
}

async function patch(path: string, args: Object, fetchFnc: typeof fetch) {
    const resp = await fetchFnc(`${endpoint}${path}`, {
        method: 'PATCH',
        body: JSON.stringify(args || {}),
        headers
    })

    const body = await resp.json()
    return body
}

async function del(path: string, fetchFnc: typeof fetch) {
    const resp = await fetchFnc(`${endpoint}${path}`, {
        method: 'DELETE',
        headers
    })

    const body = await resp.json()
    return body
}

export {
    get, post, patch, del
}