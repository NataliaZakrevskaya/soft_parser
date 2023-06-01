export interface IUserSHProfile {
  id?: number,
  avatar: {
    url: string,
  },
  first_name: string,
  last_name: string,
  nickname: string,
  real_name: string,
  company: string,
}