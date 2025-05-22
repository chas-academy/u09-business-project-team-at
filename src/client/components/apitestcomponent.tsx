import { useState, useEffect } from "react";

export default function ApiTestComponent() {

    const [response, setResponse] = useState("")

    useEffect(() => {
        fetch("/api/test")
        .then((res) => res.text())
        .then((text) => setResponse(text))
        .catch((error) => setResponse(error.toString()))
    })

    return <p>{response}</p>
}