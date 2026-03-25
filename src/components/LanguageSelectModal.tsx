import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLocale, locales, setLocale } from '@/paraglide/runtime'
import { m } from '@/paraglide/messages'

export default function LanguageSelectModal() {
    const [open, setOpen] = useState( false )
    const currentLocale = getLocale()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    id="language-select-trigger"
                    className="rounded-full px-3 py-2 text-xs font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                    aria-label={m.language_label()}
                >
                    {currentLocale.toUpperCase()}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-xs w-full">
                <DialogHeader>
                    <DialogTitle>{m.language_label()}</DialogTitle>
                </DialogHeader>
                <Select value={currentLocale} onValueChange={( locale ) => { setLocale( locale as typeof locales[number] ); setOpen( false ) }}>
                    <SelectTrigger className="w-full mt-4">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {locales.map( ( locale ) => (
                            <SelectItem key={locale} value={locale}>
                                {locale.toUpperCase()}
                            </SelectItem>
                        ) )}
                    </SelectContent>
                </Select>
            </DialogContent>
        </Dialog>
    )
}
