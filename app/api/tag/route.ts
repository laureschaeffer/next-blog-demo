import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        //liste des tags
        const tags = await db.tag.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(tags);

    } catch (error) {
        console.log("[TAGS]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}