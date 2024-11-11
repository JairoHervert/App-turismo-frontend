import {Router} from 'express';

const router = Router();

router.post('/iniciar-sesion', (req, res) => {
    const { correo, contraseña } = req.body;
    const query = 'CALL UsuarioIniciarSesion(?, ?);';
  
    db.query(query, [correo, contraseña], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const resultado = results[0][0] || null;
      res.json({ id: resultado ? resultado.id : null });
    });
});