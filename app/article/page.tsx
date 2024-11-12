import { db } from '@/lib/db'
import React from 'react'

//lorsqu'il y a une fonction await il faut obligatoirement mettre la fonction fléchée en async pour que tout soit asynchrone

const page = async () => {
    // recupère liste des articles
    const articles = await db.article.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    //db.nomdumodele.methode()

    return (
        <div className='py-10 px-5'>
            <h1 className='text-2xl font-bold my-4'>Blog</h1>
            
            {/* liste des articles */}
            {articles.map((article:any) => (
                <div key={article.id} className='my-5 mx-3'>
                    <h2 className='font-bold text-emerald-800'>{article.title}</h2>
                    <p>{article.text}</p>
                </div>
            ))}
            
        </div>
    )
}

export default page
