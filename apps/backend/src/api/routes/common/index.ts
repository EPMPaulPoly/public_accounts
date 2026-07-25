import { Router } from 'express';
import { creationRouteurDonnees } from './geojsonGest';
import { creationRouteurDonneesCSV } from './fichiersCSV';
import { Pool } from 'pg';

export const createCommonRouter = () => {
    const database= {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    }
    const pool = new Pool(database);
    const router = Router();
    console.log('going through common router')
    router.use('/geojson',creationRouteurDonnees(pool))
    router.use('/fichier-csv',creationRouteurDonneesCSV(pool))
    return router;
}