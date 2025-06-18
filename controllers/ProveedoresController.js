const Proveedor = require('../models/Proveedor'); // importa directo el modelo

exports.mostrarFormulario = (req, res) => {
  res.render('proveedor/crear', {
    title: 'Registrar Proveedor'
  });
};

exports.crearProveedor = async (req, res) => {
  const { Nombre, Direccion, Telefono, Email } = req.body;

  try {
    await Proveedor.create({
      Nombre,
      Direccion,
      Telefono,
      Email
    });

    res.render('proveedor/crear', {
      title: 'Registrar Proveedor',
      success: `Proveedor ${Nombre} registrado correctamente`
    });
  } catch (error) {
  console.error('Error al registrar proveedor:', error.message);
  console.error(error); // para ver más detalles
  res.render('proveedor/crear', {
    title: 'Registrar Proveedor',
    error: 'Hubo un problema al registrar el proveedor'
  });
}

};
