// // import "./style.css";

// // import ReactCalendar from "react-calendar"
// import "react-calendar/dist/Calendar.css";
// import moment from 'moment';
// import React , {useState} from "react";
// import { CategoryPopUpCard } from "../../../modules/Home/containers/FestivalContainer/styled";

// type ptopType={
//   handleCalenderVisibility:()=>void
// }

// export default function DateRangeCalendar({ handleCalenderVisibility ,propEnd,propStart}: any) {
//   const [dateFrom, setDateFrom] = useState<Date | null>(null);
//   const [dateTo, setDateTo] = useState<Date | null>(null);
//   const [isRender,setIsRender]=useState<boolean>(false)

//   return (
//     <div className="App">
//       <CategoryPopUpCard data-identity="" onClick={(e:any)=>{ if('identity' in e.target.dataset){console.log("object");handleCalenderVisibility()}}}>

//       <div >
//       <ReactCalendar
//         selectRange
//         prev2Label={null}
//         next2Label={null}
//         minDetail="month"
//         value={[dateFrom, dateTo]}
//         onChange={(res: Date[]) => {
//           setDateFrom(res[0]);
//           setDateTo(res[1]);
//           propStart(moment(res[0]).format("YYYY-MM-DD "))
//           propEnd(moment(res[1]).format("YYYY-MM-DD "))

//         }}
//         tileDisabled={(day : any) => {
//           return day.date.getDay() === 0;
//         }}
//       />

//       <hr />
//       </div>
//       </CategoryPopUpCard>
//     </div>

//   );
// }

export default function DateRangeCalendar({
  handleCalenderVisibility,
  propEnd,
  propStart,
}: any) {
  return <></>;
}
