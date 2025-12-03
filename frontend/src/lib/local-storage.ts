const USER_STORAGE_KEY = '@weather-stack:user'

export interface StoredUserData {
  token: string
  id: string
  name: string
  email: string
}

export const LocalStorage = {
  setUser: (user: StoredUserData) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  },

  getUser: () => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)

    if (!storedUser) {
      return null
    }

    const user = JSON.parse(storedUser) as StoredUserData
    return user
  },

  removeUser: () => {
    localStorage.removeItem(USER_STORAGE_KEY)
  }
}
