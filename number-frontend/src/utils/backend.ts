export const backendUrl = (path: string) => {
    const mergePath = "/api/" + path.replace(/^\//, "") 
    const base = "https://number-api.rahmanzz.workers.dev"
    return import.meta.env.DEV ? mergePath : new URL(path, base).toString()
}