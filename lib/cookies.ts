// Cookie preferences management utility

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  preferences: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_PREFERENCES_KEY = 'cookie-preferences'

export const hasCookieConsent = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(COOKIE_CONSENT_KEY) === 'true'
}

export const getCookiePreferences = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null
  
  const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY)
  if (!saved) return null

  try {
    return JSON.parse(saved) as CookiePreferences
  } catch {
    return null
  }
}

export const saveCookiePreferences = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return

  localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
  localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences))

  // Set actual cookies based on preferences
  const expires = '; path=/; max-age=31536000' // 1 year

  if (preferences.essential) {
    document.cookie = `essential=true${expires}`
  } else {
    document.cookie = 'essential=; path=/; max-age=0'
  }

  if (preferences.analytics) {
    document.cookie = `analytics=true${expires}`
  } else {
    document.cookie = 'analytics=; path=/; max-age=0'
  }

  if (preferences.preferences) {
    document.cookie = `preferences=true${expires}`
  } else {
    document.cookie = 'preferences=; path=/; max-age=0'
  }

  if (preferences.marketing) {
    document.cookie = `marketing=true${expires}`
  } else {
    document.cookie = 'marketing=; path=/; max-age=0'
  }
}

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null
}

