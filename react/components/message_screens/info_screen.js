import { Dialog, DialogTitle } from "@mui/material";

export default function InfoScreen({setInfo, open, onClose }){
    const handleClose = () => {
      setInfo(false)
    };
    
    return(
      <Dialog onClose = {handleClose} open={open}>
        <DialogTitle>This is my help screen!</DialogTitle>
      </Dialog>
    )
  
  }