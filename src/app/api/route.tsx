import { NextRequest } from "next/server"

export async function GET(req: NextRequest){

    console.log(req)

    return Response.json({
        message: 'API no ar'
    })
}