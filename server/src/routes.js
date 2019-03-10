import multer from 'multer';
import auth from './auth';
import { parse } from 'path';
import { Router } from 'express';
import models from './models/index';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname.replace("/server/src", "") + "/uploads");
    },
    filename: function(req, file, cb) {
        let name = parse(file.originalname);
        cb(null, `${name.name}-${Date.now()}${name.ext}`);
    }
});

const upload = multer({ 
    storage: storage 
});

const router = Router();
router.post("/app", upload.single('icon'), async function(req, res) {
        let tags = req.body.tags ? req.body.tags.split(" "): null;
        let t = await models.sequelize.transaction();
        try {
            let app = await models.App.create({
               include: [] 
            }, {
                transaction: t
            });
        } catch(err) {

        }
        console.log(tags);
        console.log(req.file);
        console.log(req.body);
        res.send(true);
    });

export default router;