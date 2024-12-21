import * as Sentry from '@sentry/browser'
import { createClient } from "@supabase/supabase-js";
import { supabaseIntegration } from '@supabase/sentry-js-integration'

export const supabaseClient = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
)

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      supabaseIntegration(supabaseClient, Sentry, {
        tracing: true,
        breadcrumbs: true,
        errors: true,
      }),
    ],
  })

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      supabaseIntegration(supabaseClient, Sentry, {
        tracing: true,
        breadcrumbs: true,
        errors: true,
      }),
    ],
  })

//export const testFunction = supabaseClient.functions.invoke('fake-seed',{})
