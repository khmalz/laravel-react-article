import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/inertia-react"

export default function Detail({ auth, errors, article }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            article={article}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {article.user.name == auth.user.name
                        ? "My Article"
                        : "Article"}
                </h2>
            }>
            <Head title="Article" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="font-bold text-3xl">
                                {article.title}
                            </h1>

                            <img
                                className="w-5/6 rounded-lg shadow-xl dark:shadow-gray-800 mt-5 mb-2"
                                src={
                                    article.image
                                        ? `/${article.image}`
                                        : "https://source.unsplash.com/random/1080x720"
                                }
                                alt="image description"
                            />

                            <div className="">
                                <h3 className="text-gray-500/90 text-sm">
                                    By {article.user.name}
                                </h3>
                                <h3 className="text-gray-500/90 text-xs">
                                    Published at {article.created_at}
                                </h3>
                            </div>

                            <div>
                                <p className="text-slate-800 font-barlow text-base mt-4">
                                    {article.body}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
