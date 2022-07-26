const multer = require("multer");

// Objet indiquant la nature et le format d'un document et le relier à une extension de fichier
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  };

// constante storage qui contient la fonction .diskStorage passer à multer
//pour lui indiquer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
},
filename: (req, file, callback) => {
// La fonction filename indique une instruction pour changer le nom du fichier
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype]; // Assignation d'une extension
    callback(null, name + Date.now() + "." + extension);
  },
});

//Exportation
module.exports = multer({ storage: storage }).single("image");