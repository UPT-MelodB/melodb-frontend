export interface Genre {
  $id?: string;
  id: string;
  name: string;
  description: string;
}

export interface GenreResponse {
  $id: string;
  data: Genre[];
}
