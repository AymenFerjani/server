//Fichier index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import AdherentModel from "./Adherent.js";

const app = express();
//Autorise l’accès à l’API depuis n’importe quelle origine
app.use(cors());
//Permet de traiter les requêtes qui envoient du JSON
app.use(express.json());

/* Exécute une fonction qui affiche un message dans la console lorsque
la connexion avec la base est établie */
mongoose.connection.on("connected", () => console.log("Connecté à la base"));
try {
  //Passer à la fonction connect la chaîne de connexion
  //Dans cet exemple, le nom de la base est ‘projet’
  await mongoose.connect("mongodb://localhost:27017/projet");
} catch (error) {
  console.log("Ne peut pas se connecter à la base!");
  console.log(error);
}

//Retroune la liste des adhérents
app.get("/getAdherents", async (req, res) => {
  try {
    const result = await AdherentModel.find();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});

//Retroune un seul adhérent en utilisant son _id
app.get("/getAdherent/:id", async (req, res) => {
  /* id est un paramètre envoyé avec la requête.
    Il contient l’_id de l’adhérent */
  const { id } = req.params;
  try {
    const result = await AdherentModel.findOne({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});

//Insère dans la base un nouvel adhérent
app.post("/createAdherent", async (req, res) => {
  /* req.body contient les données de la requête qui
    proviennent de notre formulaire d’ajout */
  try {
    const result = await AdherentModel.insertOne(req.body);
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//Mettre à jour un adhérent existant
app.put("/editAdherent/:id", async (req, res) => {
  /* id est un paramètre envoyé avec la requête.
    Il contient l’_id de l’adhérent */
  const { id } = req.params;
  /* req.body contient les données de la requête qui
    proviennent de notre formulaire de modification */
  try {
    const result = await AdherentModel.updateOne({ _id: id }, req.body);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//Supprimer un adhérent
app.delete("/deleteAdherent/:id", async (req, res) => {
  /* id est un paramètre envoyé avec la requête.
    Il contient l’_id de l’adhérent */
  const { id } = req.params;
  try {
    const result = await AdherentModel.deleteOne({ _id: id });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.listen(3001, () => {
  console.log("Server is started");
});
