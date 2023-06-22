import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateRangeCom from "../Daterange/DateRange";

export default function SimpleAccordion() {
  return (
    // <div>
    //   <Accordion defaultExpanded={false}>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel1a-content"
    //       id="panel1a-header"
    //     >
    //       <Typography>Accordion 1</Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    //         malesuada lacus ex, sit amet blandit leo lobortis eget.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>

    // </div>
    <DateRangeCom />
  );
}

// .MuiButtonBase-root {
//   background-color: #efefef;
//   border-radius: 10px;
// }
// .css-o4b71y-MuiAccordionSummary-content{
//   margin: 0;
// }
