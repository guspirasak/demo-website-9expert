import { useEffect, useState } from "react"

const decode = (value: string) => JSON.stringify(value)
const encode = (value: string) => JSON.parse(value)

const useLocalStorage = (key: string, defaultState: string) => {
    const [value, setValue] = useState(
        encode(localStorage.getItem(key)!) || defaultState
    )

    useEffect(() => {
        localStorage.setItem(key, decode(value))
    }, [key, value])

    return [value, setValue]
}

export {
    useLocalStorage
}
