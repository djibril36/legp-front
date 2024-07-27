export interface Voyage {
  id?: number;
  id_voyage?: string;
  date_voyage?: Date;
  ville_depart?: string;
  ville_arrivee?: number;
  kilo_dispo?: number;
  nombre_de_colis?: number;
  tarif?: number;
  nom_gp?: string;
  semaine?: number;
  commentaire?: string;
  statut?: string;
}
