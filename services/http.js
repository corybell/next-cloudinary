
export async function fetcher(url) {
    if (!url) {
        return null
    }

    const response = await fetch(url)
    const data = await response.json()
    return {
        ...response,
        data
    }
}
