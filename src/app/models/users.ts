export interface IUser {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[];
  support: Support;
}

interface Support {
  url: string;
  text: string;
}

export interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
