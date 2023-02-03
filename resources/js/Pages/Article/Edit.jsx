import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Inertia } from "@inertiajs/inertia"
import { Head, useForm } from "@inertiajs/inertia-react"
import { useEffect, useState } from "react"

export default function Edit({ auth, article }) {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const { data, setData, post, errors } = useForm({
        _method: "PUT",
        title: article.title,
        body: article.body,
        image: null,
    })

    function handleInput(e) {
        const name = e.target.name
        const value = e.target.value
        setData(text => ({ ...text, [name]: value }))
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setData(data => ({ ...data, image: e.target.files[0] }))

        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function editArticle(e) {
        e.preventDefault()

        // put(route("article.update", article.slug)) -> Ketika upload foto baru bikin request jadi kosong
        post(route("article.update", article.slug))
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Article
                </h2>
            }>
            <Head title="Create Article" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-center">
                                Edit Article
                            </h1>

                            <form onSubmit={editArticle}>
                                <div className="mb-3 mt-5">
                                    <InputLabel
                                        forInput="title"
                                        value="Title"
                                    />
                                    <TextInput
                                        type="text"
                                        value={data.title || ""}
                                        handleChange={handleInput}
                                        name="title"
                                        id="title"
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                    />

                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel forInput="body" value="Body" />
                                    <textarea
                                        onChange={handleInput}
                                        value={data.body || ""}
                                        name="body"
                                        id="body"
                                        className="w-full h-32 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-sm"></textarea>

                                    <InputError
                                        message={errors.body}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    {article.image &&
                                        selectedFile === undefined && (
                                            <div className="grid grid-cols-12">
                                                <img
                                                    src={`/${article.image}`}
                                                    className="w-full rounded-md my-4 col-span-12 sm:col-span-10"
                                                />
                                            </div>
                                        )}
                                    {selectedFile && (
                                        <div className="grid grid-cols-12">
                                            <img
                                                src={preview}
                                                className="w-full rounded-md my-4 col-span-12 sm:col-span-10"
                                            />
                                        </div>
                                    )}
                                    <input
                                        onChange={onSelectFile}
                                        type="file"
                                        name="image"
                                        className="w-full text-slate-800 font-semibold border p-2 file:mr-4 file:py-2 file:px-4 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-sm focus:outline-none
                                        file:rounded-full file:border-0 file:shadow-md 
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    />
                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={editArticle}
                                    className="bg-blue-600 hover:bg-blue-700 rounded-lg inline-flex items-center px-4 py-2 border border-transparent font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                                    Edit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
