const USER_STORAGE_KEY = '@weather-stack:user'

export const LocalStorage = {
  setUser: (user: unknown) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  },

  getUser: () => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    return storedUser
  },

  removeUser: () => {
    localStorage.removeItem(USER_STORAGE_KEY)
  }
}
