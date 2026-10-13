import { defineEnvVars } from "@sveltejs/kit/env"

export const variables = defineEnvVars({
  PUBLIC_ENVIRONMENT: { public: true, static: true },
})
