const TOken = '1Adminadminadmin@admin.comsecret_admin'

const user = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
}

const login = {
  "email": "admin@admin.com",
  "password": "secret_admin"
}

const wrongLogin = {
  email: '@user.com',
  password: 'secret_user',
}

export { TOken, user, wrongLogin, login };