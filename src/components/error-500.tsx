import { m } from '@/paraglide/messages'

export default function Error500() {
    return (
        <div id="error-500" className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <h1 className="text-6xl font-bold text-destructive mb-4">500</h1>
            <h2 className="text-2xl font-semibold mb-2">{m.error_500_title()}</h2>
            <p className="text-zinc-400 mb-6">{m.error_500_message()}</p>
            <a href="/" className="text-primary underline font-medium">{m.error_500_cta()}</a>
        </div>
    )
}
