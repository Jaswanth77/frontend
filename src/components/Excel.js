import React from "react";
import classes from "../styles/ExcelView.module.css";
import axios from "axios";
const base_url = "http://192.168.0.29:8888/form/application-forms/";

// function ExcelView()
// {
//     function handleExport()
//     {
//         axios.get(base_url+"excel/")
//     .then((response)=>{
//       const blob = response.blob();
//       const url = window.URL.createObjectURL(new blob([blob]));
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'application_data.xlsx';
//       a.click();

//       window.URL.revokeObjectURL(url);
//     })
//     .catch((error)=>{
//         console.log("error exporting data:",error);
//     } )
//     }
//     return(
//         <div>
//             <button className={classes.button} onClick={handleExport}>Export to excel</button>
//             <h1>The download will begin shortly</h1>
//         </div>
//     )
// }

const ExcelView = () => {
    // const handleExportClick = async () => {
    //   try {
    //     const response = await axios.get(base_url+'excel/'); // Replace with your backend URL
  
    //     const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //     const url = window.URL.createObjectURL(blob);
  
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'exported_data.xlsx';
    //     a.click();
  
    //     // Clean up the URL object to free resources
    //     window.URL.revokeObjectURL(url);
    //   } catch (error) {
    //     console.error('Error exporting data:', error);
    //   }
    // };
    const handleExportClick = async () => {
    try {
      const response = await axios.get(base_url+'excel/', {
        responseType: 'arraybuffer', // This is important for handling binary data
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported_data.xlsx';
      a.click();

      // Clean up the URL object to free resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };
  
    return (
        <div className={classes.container}>
        <button className={classes.button} onClick={handleExportClick}>Export to Excel</button>
        <h1>Download will begin shortly</h1>
        </div>
      
      
    );
  };

export default ExcelView;