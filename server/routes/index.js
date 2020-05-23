import { Router } from 'express';
const router = Router();

import {
  users,
  login,
  human_resources,
  lots,
  cycles,
  sowing,
  binnacle,
  activities
} from '../controllers';
import auth from '../middlewares/authentication';
import { binnacleDetail, binnacleUpdate } from '../controllers/binnacle';

//********Users Routes*******/
router.post('/user/signUp', users.singUpUser); //Registro de cuenta
router
  .route('/user/:id')
  .get(users.getUser) //Obtener usuario
  .put(users.updateUser); //Actualizar usuario
router.get('/user/activation/:id/:token', users.validateTokenAccount); // Acticación de cuenta
router.put('/user/changePassword/:id', users.updatePassword); //Cambiar contraseña
router.delete('/user/accountDelete/:id', users.deleteAccount); //Eliminar cuenta de usuario

//********Login Routes*******/
router.post('/login', login.login);
router.post('/user/resetPassword', login.resetPasswordEmail); //Envia correo reestablecimiento de contraseña
router.get('/user/resetPassword/:resetPassword', login.validateResetPassword); //Se valida token de contraseña
router.put('/user/resetPassword/confirm', login.confirmPassword); //Se confirma contraseña

//********Human_Resources Routes*******/
router
  .route('/humanResources')
  .post(auth.verifyToken, human_resources.hrAdd) // Agregar empleado
  .get(auth.verifyToken, human_resources.getHr); //Obtener empleados
router
  .route('/humanResources/:id')
  .get(auth.verifyToken, human_resources.getHrById) //Obtener empleado por id
  .put(auth.verifyToken, human_resources.hrUpdate) //Actualizar empleado
  .delete(auth.verifyToken, human_resources.hrDelete); //Eliminar empleado

//********Lots Routes*******/
router
  .route('/lots')
  .post(auth.verifyToken, lots.lotAdd)
  .get(auth.verifyToken, lots.getLots);

router
  .route('/lots/:id')
  .get(auth.verifyToken, lots.getLotById)
  .put(auth.verifyToken, lots.lotUpdate)
  .delete(auth.verifyToken, lots.lotDelete);

//********Cycles Routes*******/
router
  .route('/cycles')
  .post(auth.verifyToken, cycles.cycleAdd)
  .get(auth.verifyToken, cycles.getCycles);

router
  .route('/cycles/:id')
  .get(auth.verifyToken, cycles.getCycleById)
  .put(auth.verifyToken, cycles.cycleUpdate)
  .delete(auth.verifyToken, cycles.cycleDelete);

//********Sowing Routes*******/
router.get('/sowing/byLots/:lotId', auth.verifyToken, sowing.getSowing);
router.post('/sowing', auth.verifyToken, sowing.addSowing);
router
  .route('/sowing/:id')
  .get(auth.verifyToken, sowing.getSowingById)
  .put(auth.verifyToken, sowing.sowingUpdate)
  .delete(auth.verifyToken, sowing.sowingDelete);

//********Binnacle Routes*******/
router.post('/binnacle', auth.verifyToken, binnacle.binnacleAdd);

router
  .route('/binnacle/:id')
  .get(auth.verifyToken, binnacle.binnacleDetail) //Muestra las actividades por id de bitácora
  .put(auth.verifyToken, binnacle.binnacleUpdate) //Editar bitácora
  .delete(auth.verifyToken, binnacle.binnacleDelete);

router.get(
  '/binnacle/bySowing/:sowingId',
  auth.verifyToken,
  binnacle.getBinnacles
); //Obtener bitácora por siembra

//********Activities Routes*******/
router.post('/activitie', auth.verifyToken, activities.activitieAdd);

router
  .route('/activitie/:id')
  .get(auth.verifyToken, activities.getActivitieById) //Muestra las actividades por id
  .put(auth.verifyToken, activities.updateActivitie) //Editar actividad
  .delete(auth.verifyToken, activities.activitieDelete);
router.get(
  '/activities/byBinnacle/:binnacleId',
  auth.verifyToken,
  activities.getActivitiesByBinnacle
); //Obtener actividad por bitácora
router.put('/activitie/init/:id', auth.verifyToken, activities.initActivitie); //Iniciar actividad
router.put(
  '/activitie/finish/:id',
  auth.verifyToken,
  activities.finishActivitie
); //Finalizar actividad

export default router;
