import { Gp } from "./gp";

export interface Colis {
  // details colis
  numero_colis: string;
  description: string;
  montant: number;
  poids: number;
  typeColis: string;
  etatColis: string;
  paye: boolean;
  // expediteur
  expediteur: string;
  telephoneExp: string;
  cinExp: string;
  // destinataire
  destinataire: string;
  telephoneDest: string;
  cinDest: string;
  gp: Gp;
  nom_gp: string;
}
