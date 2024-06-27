import { Utilisateur } from "./utilisateur";

export interface AuthResponse {
  jwt: string;
  user: Utilisateur;
}
