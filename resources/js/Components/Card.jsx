import { Link } from "@inertiajs/inertia-react"

const Title = ({ children }) => (
    <Link href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {children}
        </h5>
    </Link>
)

const Subtitle = ({ className, children }) => (
    <h5
        className={`${className} text-xs sm:text-sm tracking-tight text-gray-500 dark:text-white`}>
        {children}
    </h5>
)

const Body = ({ children }) => (
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm sm:text-base">
        {children}
    </p>
)

const Button = ({ href, children }) => (
    <Link
        href={href}
        className="inline-flex items-center py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {children}
        <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
        </svg>
    </Link>
)

const Card = ({ children }) => {
    return (
        <div className="p-6 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 self-stretch flex flex-wrap flex-col items-start justify-between">
            {children}
        </div>
    )
}

Card.Title = Title
Card.Subtitle = Subtitle
Card.Body = Body
Card.Button = Button

export default Card
