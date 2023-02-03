import React from "react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link } from "@inertiajs/inertia-react"
import Card from "@/Components/Card"
import { BsTrash2 } from "react-icons/bs"
import { MdOutlineModeEdit } from "react-icons/md"
import { Inertia } from "@inertiajs/inertia"

export default function Article({ auth, articles, flash }) {
    function deleteArticle(slug) {
        if (confirm("Apakah Yakin Untuk Menghapus?")) {
            Inertia.delete(`/article/${slug}`)
        }
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My Article
                </h2>
            }>
            <Head title="Article" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.success && (
                        <div
                            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                            role="alert">
                            <span className="font-semibold mr-1">Success!</span>
                            {flash.success}
                        </div>
                    )}
                    {flash.info && (
                        <div
                            className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-semibold mr-1">Success!</span>
                            {flash.info}
                        </div>
                    )}
                    {flash.danger && (
                        <div
                            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                            role="alert">
                            <span className="font-semibold mr-1">Success!</span>
                            {flash.danger}
                        </div>
                    )}
                    <div className="flex justify-end mb-5">
                        <Link href="/article/create">
                            <>
                                <button
                                    type="button"
                                    className="bg-blue-600 hover:bg-blue-700 rounded-lg inline-flex items-center px-4 py-2 border border-transparent font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                                    Create
                                </button>
                            </>
                        </Link>
                    </div>

                    <div className="grid justify-center md:justify-start lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-7">
                        {articles.map(article => (
                            <Card key={article.id}>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Body>{article.body}</Card.Body>
                                <div className="flex justify-between w-full items-center">
                                    <Card.Button
                                        href={`/article/${article.slug}`}>
                                        Read More
                                    </Card.Button>
                                    <div className="flex gap-x-1 items-center">
                                        <button
                                            onClick={() =>
                                                deleteArticle(article.slug)
                                            }
                                            type="button"
                                            className="text-2xl bg-rose-500 hover:bg-rose-600 p-1 rounded">
                                            <BsTrash2 className="text-white" />
                                        </button>
                                        <Link
                                            href={`/article/${article.slug}/edit`}
                                            className="inline-flex items-center text-white text-2xl bg-sky-500 hover:bg-sky-600 p-1 rounded">
                                            <MdOutlineModeEdit className="text-white" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
