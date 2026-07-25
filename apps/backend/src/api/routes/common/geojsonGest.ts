import { RequestHandler, Router } from "express";
import { Pool } from "pg";

import { importFile, runFileUpload } from "../../services/common/geojsonGest.services";
import { requireAuth, requireRole } from "../../middleware/auth";


export const creationRouteurDonnees = (pool: Pool): Router => {
    const router = Router();
    // main upload handler
    const versementTemp: RequestHandler = async(req, res) => {
        console.log('Entering file upload')
        // run multer
        try{
            runFileUpload(req,res)
        } catch{
            res.status(500).json({ error: "Failed to process file" });
        }
    };
    const importBD:RequestHandler= async(req, res) => {
        try {
            const { file_id, mapping,table } = req.body;
            const insertedCount = await importFile(pool,file_id, mapping,table);
            console.log(`Inserted ${insertedCount}`)
            res.json({ success: true,data: insertedCount });
        } catch (err:any) {
            res.status(500).json({ success: false, error: err.message });
        }
    }


    router.post('/temp-upload',requireAuth,requireRole('admin'),versementTemp)
    router.post('/import',requireAuth,requireRole('admin'),importBD)
    return router
}