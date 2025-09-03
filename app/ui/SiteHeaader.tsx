import Image from "next/image"

export default function SiteHeader() {
    return (
        <header className="bg-primary text-primary-foreground p-6 shadow relative">
            <Image
                src="/Link-Logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="absolute left-6 top-1/2 -translate-y-1/2 object-contain"
                priority
            />
            <h1 className="text-2xl md:text-3xl font-bold text-center">Linkly</h1>
        </header>
    )
}
