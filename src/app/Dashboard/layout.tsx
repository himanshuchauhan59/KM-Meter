import Header from "../component/header/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="w-full h-12">
                <Header />
            </div>
            <div className="w-full h-[calc(100vh_-_48px)] overflow-y-scroll">
                {children}
            </div>
        </main>
    );
}
