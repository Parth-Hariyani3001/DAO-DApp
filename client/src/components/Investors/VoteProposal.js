import "./investors.css"
function VoteProposal({state,account}){
    async function VoteProposal(e) {
        try {
            e.preventDefault();
            const {contract} = state;
            const voteId = document.querySelector('#voteId').value;
            await contract.methods.voteProposal(voteId).send({from : account, gas : 480000})
        } catch(err) {
            alert(err);
        }
        window.location.reload();
    }
    return<><form onSubmit={VoteProposal}>
     <label className="label1" htmlFor="voteId">
     <span className="font">Proposal Id:</span>
        </label>
    <input type="text" id="voteId"></input>
    <button className ="button" type="submit">Vote</button>
    </form><br></br></>
   }
   export default VoteProposal;