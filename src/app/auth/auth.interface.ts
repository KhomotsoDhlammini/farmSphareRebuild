import {UserInterface} from 'src/app/shared/types/user.interface'

export interface AuthResponseInterface extends UserInterface {
  token: string
  authenticationId: number  // this is for auth-only, then its converted to :id
}

export interface LoginRequestInterface {
  username: string
  password: string
}

export interface RegisterRequestInterface extends LoginRequestInterface {
  phoneNumber: string
  userImageURL?: string
  role: string
}
