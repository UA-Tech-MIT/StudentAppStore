import formidable from 'formidable';
import auth from './auth';
 export default (app) => {
    // define the home page route
    app.post('/user/:userId/thumbnail', function (req, res) {
        const reqParam = req.params.userId; let userId;
        console.log(req.user);
        try {
            userId = parseInt(reqParam);
        } catch (err) {
            console.log(err);
            res.send(false);
        }
        // use formiddable to parse form data
        var form = new formidable.IncomingForm();
         form.parse(req);
         // form.uploadDir= '/uploads';
        // form.type = 'multipart';
        // form.maxFieldsSize = 25 * 1024 * 1024;
     
        form.on('fileBegin', function (name, file){
            file.path = __dirname + '/uploads/' + file.name;
        });
    
        form.on('file', function (name, file){
            console.log('Uploaded ' + file.name);
        });
    
        // res.sendFile(__dirname + '/index.html');
         res.send(true)
    })
    // define the about route
    app.post('/app/:appId/thumbnail', function (req, res) {
        res.send('About birds')
    })
}