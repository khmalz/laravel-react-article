import React from "react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/inertia-react"
import Card from "@/Components/Card"
import _ from "lodash"
import Pagination from "@/Components/Pagination"

export default function Article({ auth, articles }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Article
                </h2>
            }>
            <Head title="Article" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
                    <div className="grid justify-center md:justify-start lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-7">
                        {articles.data.map(article => (
                            <Card key={article.id}>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Body>{article.body}</Card.Body>
                                <div className="flex justify-between w-full items-center">
                                    <Card.Subtitle>
                                        <span className="mr-0.5">By</span>{" "}
                                        {article.user.name}
                                    </Card.Subtitle>
                                    <Card.Button
                                        href={`/article/${article.slug}`}>
                                        Read More
                                    </Card.Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="flex justify-center my-8">
                        <Pagination class="mt-6" links={articles.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
