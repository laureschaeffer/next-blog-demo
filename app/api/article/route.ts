import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        //db.nomdumodele.methode()
        //liste des articles
        const articles = await db.article.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            // jointure : include, le tableau tags (tagArticle), en incluant encore la collection Tag
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                },
                comments: true,
            }
        })

        return NextResponse.json(articles)
    } catch (error) {
        //ce console log est coté serveur donc dans mon terminal, pas coté client
        console.log("[ARTICLES] : ", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}