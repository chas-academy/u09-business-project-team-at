import express from "express"
import type { Request, Response } from "express"

const app = express()

app.get("/api/test", (_req:Request, res:Response) => {
    res.send("this is an api response")
})

async function main() {
    app.listen(3000, () => {
        console.log("App running on port 3000")
    })
}

main().catch(err => console.log(err))