import {Role} from "./Role";

export interface Customer {
  id?: number
  name?: string
  emailAddress?: string
  password?: string
  phoneNumber?: string
  address?: string
  image?: string
  status?:number
  Role?: [Role]
}
