import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


export default function LoadingScreen({ }) {
  
    return (
        <>
            <div
                className="popup"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    borderRadius: "8px",
                    height:'180px',
                    width:'290px',
                    zIndex: 1000,
                }}
            >
                <h4 style={{
                    textAlign:"center",
                    margin:"20px"
                  }}>Page Loading </h4>
                
                {/*<div style={{
                        textAlign:"center"
                      }}><CircularProgress size="30px"/> </div>*/}

                <Box sx={{ width: '80%', margin:"20px" }}>
                      <LinearProgress />
                    </Box>
                <div style={{
                    textAlign:"center",
                    margin:"20px"
                  }}>Please wait while page loads... </div>
                
                {/*<div style={{
                        textAlign:"center"
                      }}>
                        
                  <button
                    //onClick={}
                    style={{
                        marginTop: "10px",
                        padding: "10px 15px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        textAlign:"center"
                    }}
                  >
                    Close
                  </button>
                </div>*/}
                
            </div>
            <div
                className="overlay"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                }}
                //onClick={onClose}
            />
        </>
    );
}