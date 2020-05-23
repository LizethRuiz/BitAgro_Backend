import models from '../models';
import { isEmpty } from '../utils/nativeMethods';

//Obtiene lista de bitacora por siembra
const getBinnacles = async (req, res) => {
  try {
    const { params } = req;
    let sowingId = params.sowingId;

    const binnacles = await models.Binnacle.findAll({
      where: {
        sowingId,
        statusDelete: false
      }
    });

    return res.status(201).send(binnacles);
  } catch (error) {
    res.status(500).send(error.errors[0].message);
  }
};

//Ver actividades por bitácora
const binnacleDetail = async (req, res) => {
  try {
    const { params } = req;
    let binnacleId = params.id;

    const binnacle = await models.Binnacle.findByPk(binnacleId);

    if (!binnacle) return res.status(404).send('Binnacle not found');

    const activities = await models.Activities.findAll({
      where: {
        binnacleId,
        statusDelete: false
      }
    });

    return res.status(201).send(activities);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.errors[0].message);
  }
};

//Agregar bitácora
const binnacleAdd = async (req, res) => {
  try {
    const { body } = req;
    let sowingId = body.sowingId;

    if (isEmpty(sowingId)) return res.status(400).send('Sowing Id is required');

    const sowing = await models.Sowing.findByPk(sowingId);
    if (!sowing) return res.status(404).send('Sowing not found');

    const response = await models.Binnacle.create({
      sowingId
    });
    return res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.errors[0].message);
  }
};
//Editar bitácora
const binnacleUpdate = async (req, res) => {
  try {
    const { params, body } = req;
    let id = params.id;
    let sowingId = body.sowingId;
    let status = body.status;

    if (isEmpty(sowingId)) return res.status(400).send('Sowing is required');
    if (isEmpty(status)) return res.status(400).send('status is required');

    const binnacleFind = await models.Binnacle.findByPk(id);
    if (!binnacleFind) return res.status(404).send('Binnacle not found');

    const binnUpdate = await models.Binnacle.update(
      {
        sowingId,
        status
      },
      {
        where: {
          id
        }
      }
    );

    if (binnUpdate) return res.status(201).send('Binnacle has been update');
  } catch (error) {
    res.status(500).send(error.errors[0].message);
  }
};

//Eliminar Bitacora
const binnacleDelete = async (req, res) => {
  try {
    const { params } = req;
    let id = params.id;

    const binnacleFind = await models.Binnacle.findByPk(id);

    if (!binnacleFind) return res.status(404).send('Binnacle not found');

    const binnacleDel = await models.Binnacle.update(
      {
        statusDelete: true
      },
      {
        where: {
          id
        }
      }
    );

    return res.status(201).send('Binnacle has been delete');
  } catch (error) {
    res.status(500).send(error.errors[0].message);
  }
};

export {
  getBinnacles,
  binnacleDetail,
  binnacleAdd,
  binnacleUpdate,
  binnacleDelete
};
