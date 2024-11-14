"use client";
// import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react'

//lorsqu'il y a une fonction await il faut obligatoirement mettre la fonction fléchée en async pour que tout soit asynchrone

const page = () => {

    // VERSION 1 : recupère liste des articles ici directement
    {/*
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
            }
        }
    })
    */}

    // VERSION 2 : HOOKS
    const [articles, setArticles] = useState([])
    
    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch('/api/article');
            const data = await response.json()
            setArticles(data) //met à jour articles
        }

        fetchArticles()

    }, [])

    return (
        <div className='py-10 px-5'>
            <h1 className='text-2xl font-bold my-4'>Blog</h1>
            
            {/* liste des articles */}
            {articles.map((article:any) => (
                <div key={article.id} className='my-5 mx-3'>
                    <h2 className='font-bold text-emerald-800'>{article.title}</h2>

                    {/* date / heure */}
                    <p> {new Date(article.createdAt).toLocaleDateString()} {new Date(article.createdAt).toLocaleTimeString()} </p>

                    {/* liste des tags */}
                    {article.tags.map((tagArticle: any) => (
                        <span key={tagArticle.tag.id}>
                            {tagArticle.tag.name}
                        </span>
                    ))}

                    <p>{article.text}</p>
                </div>
            ))}
            
        </div>
    )
}

export default page
