export const subirImagen = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ningún archivo.');
  }

  res.status(200).json({ 
    file: { path: `/images/${req.file.filename}` }
  });
};
