import { RequestHandler, Router } from "express";
import { Pool } from "pg";
import { importCSVFile, runCSVFileUpload } from "../../services/common/fichiersCSV.services";
import { requireAuth, requireRole } from "../../middleware/auth";


export const creationRouteurDonneesCSV = (pool: Pool): Router => {
    const router = Router();
    // main upload handler
    const versementTemp: RequestHandler = async(req, res) => {
        console.log('Entering file upload')
        // run multer
        try{
            runCSVFileUpload(req,res)
        } catch{
            res.status(500).json({ error: "Failed to process file" });
        }
    };
    const importBD:RequestHandler= async(req, res) => {
        console.log('Entering file Save to DB')
        try {
            const { file_id, mapping_cols,table,mapping_geom,year } = req.body;
            const insertedCount = await importCSVFile(pool,file_id, mapping_cols,table,year,mapping_geom);
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