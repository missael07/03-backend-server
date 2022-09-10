import express from "express";
import cors from 'cors';

import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import hospitalsRoutes from "../routes/hospitals.routes";
import doctorsRoutes from "../routes/doctors.routes";
import searchRoutes from '../routes/searchs.routes';
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

    routes(): void{
        //cors
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());

    //declare routes
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/login', authRoutes);
    this.app.use('/api/hospitals', hospitalsRoutes);
    this.app.use('/api/doctors', doctorsRoutes);
    this.app.use('/api/search', searchRoutes);
    }


    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}