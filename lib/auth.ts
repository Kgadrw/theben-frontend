// Authentication utilities

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('admin_authenticated') === 'true'
}

export const login = (email: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('admin_authenticated', 'true')
  localStorage.setItem('admin_email', email)
}

export const logout = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('admin_authenticated')
  localStorage.removeItem('admin_email')
}

export const getAdminEmail = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_email')
}

