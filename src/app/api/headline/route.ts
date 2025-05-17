import type { NextApiRequest } from "next"
import type ApiResponse from "@/types/api-response"
import { NextResponse } from "next/server"

declare global {
    namespace NodeJS {
        interface Global {
            headline?: string
            clients?: Set<WritableStreamDefaultController>
        }
    }

    var headline: string
    var clients: Set<WritableStreamDefaultController>
}

if (!global.headline) {
    global.headline = "Welcome to Multiplayer News!"
}

if (!global.clients) {
    global.clients = new Set()
}

const minHeadlineLength = 30
const maxHeadlineLength = 60

export function GET(req: NextApiRequest) {
    return NextResponse.json(<ApiResponse>{
        status: true,
        data: global.headline,
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

    global.headline = newHeadline
    return NextResponse.json(<ApiResponse>{
        status: true,
        message: "The headline was updated!",
    })
}
