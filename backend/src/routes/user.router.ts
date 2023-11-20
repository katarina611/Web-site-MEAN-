import express from 'express';
import { UserController } from '../controller/user.controller';
const userRouter = express.Router();

userRouter.route('/getUsers').post(
    (req, res) => new UserController().getUsers(req, res)
)
userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)
userRouter.route('/getAllUN').get(
    (req, res) => new UserController().getAllUN(req, res)
)
userRouter.route('/getAll').get(
    (req, res) => new UserController().getAll(req, res)
)
userRouter.route('/getUser').post(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/update').post(
    (req, res) => new UserController().update(req, res)
)
userRouter.route('/search').post(
    (req, res) => new UserController().search(req, res)
)
userRouter.route('/inputDoc').post(
    (req, res) => new UserController().inputDoc(req, res)
)
userRouter.route('/deleteUser').post(
    (req, res) => new UserController().deleteUser(req, res)
)
userRouter.route('/prihvatiZahtev').post(
    (req, res) => new UserController().prihvatiZahtev(req, res)
)
userRouter.route('/addND').post(
    (req, res) => new UserController().addND(req, res)
)
userRouter.route('/getUNLekar').post(
    (req, res) => new UserController().getUNLekar(req, res)
)
export default userRouter;