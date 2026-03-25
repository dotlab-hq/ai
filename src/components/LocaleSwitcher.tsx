// Locale switcher refs:
// - Paraglide docs: https://inlang.com/m/gerre34r/library-inlang-paraglideJs
// - Router example: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#switching-locale

import { getLocale, locales, setLocale } from '@/paraglide/runtime'
import { m } from '@/paraglide/messages'
import { Button } from './ui/button'
import { Label } from './ui/label'

export default function ParaglideLocaleSwitcher() {
  const currentLocale = getLocale();

  return (
    <div
      id="locale-switcher-root"
      className="flex gap-2 items-center text-inherit"
      aria-label={m.language_label()}
    >
      <Label id="locale-switcher-label" className="opacity-85">
        {m.current_locale( { locale: currentLocale } )}
      </Label>
      <div id="locale-switcher-buttons" className="flex gap-1">
        {locales.map( ( locale ) => (
          <Button
            key={locale}
            id={`locale-switcher-btn-${locale}`}
            type="button"
            variant={locale === currentLocale ? "default" : "outline"}
            aria-pressed={locale === currentLocale}
            onClick={() => setLocale( locale )}
            className="rounded-full px-3 py-2 text-xs font-semibold"
          >
            {locale.toUpperCase()}
          </Button>
        ) )}
      </div>
    </div>
  )
}
