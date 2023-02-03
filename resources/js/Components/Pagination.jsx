import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function Pagination({ links }) {
    function getClassName(active, label) {
        if (active) {
            return "py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        } else {
            return `py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                label.includes("Previous") ? "rounded-l-lg" : ""
            } ${label.includes("Next") ? "rounded-r-lg" : ""}`
        }
    }

    const renderHTML = rawHTML =>
        React.createElement("span", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        })
    return (
        links.length > 3 && (
            <nav aria-label="Page navigation">
                <ul className="inline-flex -space-x-px">
                    {links.map((link, key) =>
                        link.url === null ? (
                            <li key={key}>
                                <a
                                    className={`py-2 px-3 ml-0 leading-tight text-gray-500 border border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer ${
                                        link.label.includes("Previous")
                                            ? "rounded-l-lg"
                                            : "rounded-r-lg"
                                    }`}>
                                    {renderHTML(link.label)}
                                </a>
                            </li>
                        ) : (
                            <li key={key}>
                                <a
                                    href={link.url}
                                    className={getClassName(
                                        link.active,
                                        link.label,
                                    )}>
                                    {renderHTML(link.label)}
                                </a>
                            </li>
                        ),
                    )}
                </ul>
            </nav>
        )
    )
}
