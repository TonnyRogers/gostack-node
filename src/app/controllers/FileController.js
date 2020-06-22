import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    try {
      const file = await File.create({
        name,
        path,
      });

      return res.json(file);
    } catch (error) {
      return res.status(500).json({ error: 'Can not update this file' });
    }
  }
}

export default new FileController();
