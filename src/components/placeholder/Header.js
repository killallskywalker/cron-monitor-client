export default function header({title}) {
    return (
        <div className="border-b-2 border-gray-300">
            <header>
                <h1 className="text-4xl py-2 mx-10">{title}</h1>
            </header>
        </div>
    )
}