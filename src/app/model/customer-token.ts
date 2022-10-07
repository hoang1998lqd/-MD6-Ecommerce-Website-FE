import {Role} from "./Role";

export interface CustomerToken{
  id?: string
  name?: string
  emailAddress?: string
  password?: string
  accessToken?: string;
  phoneNumber?: string
  address?: string
  image?: string
  status?:number
  role?: Role[]
}
