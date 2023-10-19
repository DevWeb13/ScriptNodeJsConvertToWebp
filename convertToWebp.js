const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIRECTORY = './public/assets'; // Par exemple: './images/originals'
const OUTPUT_DIRECTORY = './public/assetsWebp'; // Par exemple: './images/webp'

// Assurez-vous que le répertoire de sortie existe
if (!fs.existsSync(OUTPUT_DIRECTORY)) {
  fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
}

// Lire tous les fichiers du répertoire d'entrée
const files = fs.readdirSync(INPUT_DIRECTORY);

// Filtrer pour ne garder que les images (vous pouvez ajuster cela en fonction de vos besoins)
const imageFiles = files.filter((file) =>
  ['.jpeg', '.jpg', '.png'].includes(path.extname(file))
);

// Convertir chaque image en .webp
imageFiles.forEach((file) => {
  const inputPath = path.join(INPUT_DIRECTORY, file);
  const outputPath = path.join(
    OUTPUT_DIRECTORY,
    `${path.basename(file, path.extname(file))}.webp`
  );

  sharp(inputPath).toFile(outputPath, (err, info) => {
    if (err) {
      console.error(`Erreur lors de la conversion de ${file} en .webp:`, err);
    } else {
      console.log(`${file} a été converti en .webp avec succès.`);
    }
  });
});
