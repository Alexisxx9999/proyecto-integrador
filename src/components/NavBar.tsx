import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-gray-800 flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
                <a href="#" className="text-white text-xl font-bold">Mi App</a>
            </div>
            <div className="flex items-center space-x-4">
                <Link href="login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
                <Link href="registro" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Registro</Link>
            </div>
        </nav>
    )
}