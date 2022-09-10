import express from "express";

export default class Server{
    // Language: typescript
    public app: express.Application;
    constructor(){
        this.app = express();
        this.config();
        // this.routes();
    }
    config(): void{
        this.app.set('port', process.env.DB_PORT || 3005);
    }
    // routes(): void{
    //     this.app.use(express.json());
    //     this.app.use(express.urlencoded({extended: false}));
    //     this.app.use('/api/', router);
    // }
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}