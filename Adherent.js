//Fichier Adherent.js
import mongoose from "mongoose";
//Créer un schéma pour la collection adherents
const AdherentSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
});
//Créer un modèle à partir du schéma
const AdherentModel = mongoose.model("adherents", AdherentSchema);
//Exporter ce modèle pour l’utiliser ailleurs
export default AdherentModel;
