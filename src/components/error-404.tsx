import { m } from '@/paraglide/messages'

export default function Error404() {
    return (
        <div id="error-404" className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <h1 className="text-6xl font-bold text-destructive mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">{m.error_404_title()}</h2>
            <p className="text-zinc-400 mb-6">{m.error_404_message()}</p>
            <a href="/" className="text-primary underline font-medium">{m.error_404_cta()}</a>
        </div>
    )
}
