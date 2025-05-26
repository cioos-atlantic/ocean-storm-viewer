import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, } from "@mui/material";

export default function InfoScreen({setInfo, open, onClose }){
    const handleClose = () => {
      setInfo(false)
    };

    return(
      <Dialog onClose = {handleClose} open={open} PaperPropssx={{ align: 'center', display:'flex', justifyContent: 'center' }}>
        <DialogTitle>This is my help screen!</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        <p>
            Here is some information on using the site. 
            Really this is just testing to see the functionality of a dialog box.
            And also what it supports.
            Like screenshots?
        </p>
        <img src="http://localhost:3500/ocean-storm-viewer/cioos-atlantic_EN.svg"></img>
        <p>
            I'm just a little curious how long we can make this section before the scroll bars come out
        </p>
        <img src="http://localhost:3500/ocean-storm-viewer/cioos-atlantic_EN.svg"></img>
        </DialogContent>
      </Dialog>
    )
  
  }