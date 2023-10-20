import Contribute from "./Contribute";
import TransferShare from "./TransferShare";
import ReedemShare from "./ReedemShare"
import VoteProposal from "./VoteProposal"
import InvestorList from "./InvestorList";
import ProposalList from "./ProposalList";
function Investors({state,account}) {
    return <> 
    <Contribute state={state} account={account}></Contribute>
    <TransferShare state={state} account={account}></TransferShare>
    <ReedemShare state={state} account={account}></ReedemShare>
    <VoteProposal state={state} account={account}></VoteProposal>
    <InvestorList state={state}></InvestorList>
    <ProposalList state={state}></ProposalList>
    </>
 

}
export default Investors;