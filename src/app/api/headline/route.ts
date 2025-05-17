import type { NextApiRequest } from "next"
import type ApiResponse from "@/types/api-response"
import { NextResponse } from "next/server"

declare global {
    namespace NodeJS {
        interface Global {
            headline: string
            clients: Set<WritableStreamDefaultController>
        }
    }

    let headline: string
    let clients: Set<WritableStreamDefaultController>
}

if (!headline) {
    headline = "Welcome to Multiplayer News!"
}

if (!clients) {
    clients = new Set()
}

const minHeadlineLength = 30
const maxHeadlineLength = 60

export function GET(_: NextApiRequest) {
    return NextResponse.json(<ApiResponse>{
        status: true,
        data: headline,
    })
}

export async function POST(request: Request) {
    const reqBody = await request.json()

    if (!reqBody.headline) {
        return NextResponse.json(<ApiResponse>{
            status: false,
            message: "You must provide a new headline!",
        })
    }

    const newHeadline = (reqBody.headline as string).trim()

    if (newHeadline.length < minHeadlineLength || newHeadline.length > maxHeadlineLength) {
        return NextResponse.json(<ApiResponse>{
            status: false,
            message: `The headline must be from ${minHeadlineLength} to ${maxHeadlineLength} characters!`,
        })
    }

    headline = newHeadline
    return NextResponse.json(<ApiResponse>{
        status: true,
        message: "The headline was updated!",
    })
}
