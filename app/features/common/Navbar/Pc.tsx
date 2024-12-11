export default function PcNavbar() {
    return (
        <div className="sm:hidden md:fixed md:block top-0 left-0 w-screen bg-yellow-500 text-black z-50 shadow-md">
            <nav className="container mx-auto p-4">
                <div className="flex justify-center space-x-10">
                    <a href="/" className="text-base text-gray-800 hover:text-gray-600">ホーム</a>
                    <a href="/awards/participationAwardPage" className="text-base text-gray-800 hover:text-gray-600">景品一覧</a>
                    <a href="/awards" className="text-base text-gray-800 hover:text-gray-600">抽選会</a>
                    <a href="/festivals/Sanzai" className="text-base text-gray-800 hover:text-gray-600">へそ祭り</a>
                    <a href="/festivals/Tonokoori" className="text-base text-gray-800 hover:text-gray-600">城址祭り</a>
                    <a href="/festivals/Minou" className="text-base text-gray-800 hover:text-gray-600">相撲大会</a>
                </div>
            </nav>
        </div>
    );
}

