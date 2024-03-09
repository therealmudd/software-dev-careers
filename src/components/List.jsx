// import React, { useState } from 'react';
// import ListItem from './ListItem.jsx';

// const List = ({ data, visible }) => {

//   const [counts, setCounts] = useState(new Array(data.length).fill(0));
//   const [hover, setHover] = useState(false);
 
//   return (
//     <div style={{display: visible ? "block" : "none"}}>
//       <div>
//         {data.map((item, index) => (
//           <ListItem item={item} index={index} onClick={()=>{
            
//           }}></ListItem>
//         ))}
//       </div>
//       <div className="badge text-bg-primary">{Math.round(counts.reduce((count, currentValue) => {
//     return count + (currentValue === 1 ? 1 : 0);}, 0) / data.length * 100)}%</div>
//     </div>
//   );
// }

// export default List;