import { useState,useEffect } from "react";

function ProposalList({state}){
   const [list,setList] = useState([]);
   useEffect(() => {
      const {contract} = state;
      async function proposals(){
         const arrayProposal = await contract.methods.ProposalList().call();
         setList(arrayProposal);
         console.log(arrayProposal);
      }
      contract && proposals();
   },[state]);

   return<>
   <div className="list">
      <h3>Proposal List</h3>
   <table>
      <tbody>
   {list.map(p => {
      return(
         <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.description}</td>
            <td>{p.amount}</td>
            <td>{p.receipient}</td>
            <td>{p.votes}</td>
            <td>{p.end}</td>
            <td>{p.isExecuted}</td>
         </tr>
      )
   })}
      </tbody> 
   </table>
   </div>
   </>
}
export default ProposalList;