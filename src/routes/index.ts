import { getLocale } from '@/paraglide/runtime'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  server:{
    handlers:{
        GET: () => {
            // get the user locale
            const locale = getLocale();
            // redirect to the locale-specific route
            return new Response(null, {
                status: 302,
                headers: {
                    Location: `/${locale}/`,
                },
            });
        }
    }
  }

})
