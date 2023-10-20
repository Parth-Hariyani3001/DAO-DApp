import CreateProposal from "./CreateProposal";
import ExecuteProposal from "./ExecuteProposal";

function Manager({state,account}) {
    return <> 
     <CreateProposal state={state} account={account}></CreateProposal>
     <ExecuteProposal state={state} account={account}></ExecuteProposal>
    </>
}
export default Manager;