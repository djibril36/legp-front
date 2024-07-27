import { Gp } from "./gp";

export interface Colis {
  id?: number;
  numero_colis?: string;
  description?: string;
  montant?: number;
  poids?: number;
  typeColis?: string;
  etatColis?: string;
  paye?: boolean;
  expediteur?: string;
  telephoneExp?: string;
  cinExp?: string;
  destinataire?: string;
  telephoneDest?: string;
  cinDest?: string;
  gp?: Gp;
  nom_gp?: string;
}
