import { dev } from "$app/environment"
import { PUBLIC_ENVIRONMENT } from "$env/static/public"
import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

const GA_MEASUREMENT_ID = "G-61TG07WYXB"
const STORAGE_KEY = "cookie-consent"

type Consent = "granted" | "denied"

// Analytics only runs on the live site, not on the preview deployment
export const analyticsEnabled = PUBLIC_ENVIRONMENT === "live"

// Only ever set in the browser, so it is never shared between SSR requests
export const consentBannerOpen: Writable<boolean> = writable(false)

let analyticsLoaded = false

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "granted" || value === "denied" ? value : null
  } catch {
    return null
  }
}

function writeConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage unavailable (e.g. private mode): the choice lasts for this visit only
  }
}

// Google Analytics is only loaded after the visitor has accepted cookies.
// Page views on client-side navigation are tracked by GA4's enhanced
// measurement (browser history events), which is on by default.
function loadAnalytics() {
  if (analyticsLoaded || dev) return
  analyticsLoaded = true

  window.dataLayer = window.dataLayer || []
  function gtag(..._args: unknown[]) {
    // gtag.js expects the arguments object itself, not an array
    window.dataLayer.push(arguments)
  }
  gtag("js", new Date())
  gtag("config", GA_MEASUREMENT_ID)

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

function deleteAnalyticsCookies() {
  // GA sets its cookies on the top-level domain, e.g. .bygningskunstogkultur.dk
  const domain = location.hostname.replace(/^www\./, "")
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim()
    if (name === "_ga" || name.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`
      document.cookie = `${name}=; Max-Age=0; path=/`
    }
  }
}

export function initConsent() {
  if (!analyticsEnabled) return
  const consent = readConsent()
  if (consent === "granted") loadAnalytics()
  consentBannerOpen.set(consent === null)
}

export function setConsent(consent: Consent) {
  const wasGranted = readConsent() === "granted"
  writeConsent(consent)
  consentBannerOpen.set(false)

  if (consent === "granted") {
    loadAnalytics()
  } else if (wasGranted) {
    // Consent withdrawn: stop gtag.js first so it can't rewrite its cookies
    // while the page unloads, then remove them and reload to unload gtag.js
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true
    deleteAnalyticsCookies()
    location.reload()
  }
}

export const openConsentBanner = () => consentBannerOpen.set(true)
