import {useState,useEffect} from "react"
function InvestorList({state}){
   const [list,setList] = useState([]);
   useEffect(() => {
      const {contract} = state;
      async function investors(){
         const investorList = await contract.methods.InvestorList().call();
         setList(investorList);
         console.log(investorList);
      }
      contract && investors();
   },[state]);

   return<>
    <div className="list">
    <h3>Investor's List</h3>
      {list.map(l => {return (
         <p key={l}>{l}</p>
      )})}
    </div>
   </>
  }
  export default InvestorList;