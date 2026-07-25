import {  useState, type Dispatch, type SetStateAction } from "react";
import { ServiceGeoJson } from "../../services/common/serviceGeoJson";
import { Divider, LinearProgress } from "@mui/material";

export interface PropsFileUploadBox{
    colonnesFichier:string[],
    defColonnesFichier:Dispatch<SetStateAction<string[]>>,
    idFichier:string,
    defIdFichier:Dispatch<SetStateAction<string>>,
    accept:string,
    title:string,
    serviceUploadPeak: (file:File,setProgress:Dispatch<SetStateAction<number>>)=>Promise<{tempFileId:string,columns:string[]}>
}

function FileUploadBox(props:PropsFileUploadBox){
    const [progress, setProgress] = useState<number>(0);
    const handleFileLoad = async(fileLoad:File) => {
        if (!fileLoad) return;
        const {tempFileId,columns} = await props.serviceUploadPeak(fileLoad,setProgress)
        console.log(tempFileId)
        props.defIdFichier(tempFileId)
        props.defColonnesFichier(columns)
    };
    return(
        <div className="form-group">
            <label>{props.title}</label>
            <input
                type="file"
                accept={props.accept}
                onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;

                    await handleFileLoad(f);
                }}
            />
            <LinearProgress variant="determinate" value={progress} />
            <span></span>
            <Divider variant="middle" sx={{borderColor:'white',padding:'10px'}} />
        </div>
    )
}

export default FileUploadBox