// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DAO {
    struct Proposal {
        uint id;
        string description;
        uint amount;
        address payable receipient;
        uint votes;
        uint end;
        bool isExecuted;
    }

    mapping(address => bool) private isInvestor;
    mapping(address => uint) public numOfshares;
    mapping(address => mapping(uint => bool)) public isVoted;
    address[] public investorsList;
    mapping(uint => Proposal) public proposals;
    uint public totalShares;
    uint public availableFunds;
    uint public contributionTimeEnd;
    uint public nextProposalId;
    uint public voteTime;
    uint public quorum;
    address public manager;

    //value passed using truffle migration file
    constructor(uint _contributionTimeEnd, uint _voteTime, uint _quorum) {
        require(_quorum > 0 && _quorum < 100, "Not valid values");
        contributionTimeEnd = block.timestamp + _contributionTimeEnd; //16342343342 + 2*3600
        voteTime = _voteTime;
        quorum = _quorum;
        manager = msg.sender;
    }

    modifier onlyInvestor() {
        require(isInvestor[msg.sender] == true, "You are not an investor");
        _;
    }
    modifier onlyManager() {
        require(manager == msg.sender, "You are not a manager");
        _;
    }

    function contribution() public payable {
        require(
            contributionTimeEnd >= block.timestamp,
            "Contribution Time Ended"
        ); //5 PM , //16342343342 + 2*3600 > 16342340000
        require(msg.value > 0, "Send more than 0 ether");
        isInvestor[msg.sender] = true;
        numOfshares[msg.sender] = numOfshares[msg.sender] + msg.value;
        totalShares += msg.value; //totaltShares=totalShares+msg.value
        availableFunds += msg.value;
        investorsList.push(msg.sender);
    }

    function reedemShare(uint amount) public onlyInvestor {
        require(
            numOfshares[msg.sender] >= amount,
            "You don't have enough shares"
        );
        require(availableFunds >= amount, "Not enough funds");
        numOfshares[msg.sender] -= amount;
        if (numOfshares[msg.sender] == 0) {
            isInvestor[msg.sender] = false;
        }
        availableFunds -= amount;
        payable(msg.sender).transfer(amount); //transferring of ether
    }

    //investor's address share will get transfered "to" address

    function transferShare(uint amount, address to) public onlyInvestor {
        require(availableFunds >= amount, "Not enough funds");
        require(
            numOfshares[msg.sender] >= amount,
            "You don't have enough shares"
        );
        numOfshares[msg.sender] -= amount;
        if (numOfshares[msg.sender] == 0) {
            isInvestor[msg.sender] = false;
        }
        numOfshares[to] += amount;
        isInvestor[to] = true;
        investorsList.push(to);
    }

    function createProposal(
        string calldata description,
        uint amount,
        address payable receipient
    ) public onlyManager {
        require(availableFunds >= amount, "Not enough funds");
        proposals[nextProposalId] = Proposal(
            nextProposalId,
            description,
            amount,
            receipient,
            0,
            block.timestamp + voteTime,
            false
        );
        nextProposalId++;
    }

    function voteProposal(uint proposalId) public onlyInvestor {
        Proposal storage proposal = proposals[proposalId];
        require(
            isVoted[msg.sender][proposalId] == false,
            "You have already voted for this proposal"
        );
        require(proposal.end >= block.timestamp, "Voting Time Ended");
        require(proposal.isExecuted == false, "It is already executed");
        isVoted[msg.sender][proposalId] = true;
        proposal.votes += numOfshares[msg.sender]; //proposal.votes=proposal.votes+numOfshares[msg.sender]
    }

    function executeProposal(uint proposalId) public onlyManager {
        Proposal storage proposal = proposals[proposalId];
        require(
            ((proposal.votes * 100) / totalShares) >= quorum,
            "Majority does not support"
        );
        proposal.isExecuted = true;
        availableFunds -= proposal.amount;
        _transfer(proposal.amount, proposal.receipient);
    }

    function _transfer(uint amount, address payable receipient) private {
        receipient.transfer(amount);
    }

    function ProposalList() public view returns (Proposal[] memory) {
        Proposal[] memory arr = new Proposal[](nextProposalId); //empty array of length=nextProposalId-1
        for (uint i = 0; i < nextProposalId; i++) {
            arr[i] = proposals[i];
        }
        return arr;
    }

    function InvestorList() public view returns (address[] memory) {
        return investorsList;
    }
}
