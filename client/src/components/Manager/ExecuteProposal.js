import "./manager.css"
function ExecuteProposal({state,account}){
    async function proposalExecute(e){
        try{
        e.preventDefault();
        const {contract} = state;
        const proposalId = document.querySelector("#id").value;
        await contract.methods.executeProposal(proposalId).send({from : account,gas : 480000});
        } catch(err) {
            alert(err);
        }
        window.location.reload();
    }
    return<><form onSubmit={proposalExecute}>
    <label className="label1" htmlFor="proposalId">
    <span className="font">Proposal Id:</span>
        </label>
    <input type="text" id="id"></input>
    <button className="button" type="submit">Execute</button>
    </form><br></br></>
    
   }
   export default ExecuteProposal;