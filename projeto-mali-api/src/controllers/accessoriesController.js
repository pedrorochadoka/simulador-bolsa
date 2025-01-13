const fs = require('fs');
const path = require('path');

exports.listBagsByColor = (color, req, res) => {
  const baseDirPath = path.join(__dirname, '../../img/bolsas');

  if (color === 'all') {
    fs.readdir(baseDirPath, (err, subDirs) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao listar diretórios de bolsas.' });
      }

      const allImages = [];

      const processDirectory = (subDirIndex) => {
        if (subDirIndex >= subDirs.length) {
          return res.json(allImages);
        }

        const subDir = subDirs[subDirIndex];
        const subDirPath = path.join(baseDirPath, subDir);

        fs.stat(subDirPath, (statErr, stats) => {
          if (statErr || !stats.isDirectory()) {
            return processDirectory(subDirIndex + 1);
          }

          fs.readdir(subDirPath, (readErr, files) => {
            if (!readErr) {
              const images = files
                .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file))
                .map(file => `${subDir}/${file}`); // Caminho relativo completo
              allImages.push(...images);
            } 
            processDirectory(subDirIndex + 1);
          });
        });
      };

      processDirectory(0);
    });
  } else {
    const dirPath = path.join(baseDirPath, `opcoes-${color}`);
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: `Erro ao listar arquivos para a cor ${color}.` });
      }
      const images = files.filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
      res.json(images);
    });
  }
};

