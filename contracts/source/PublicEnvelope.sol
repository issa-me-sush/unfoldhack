// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BalanceManager.sol";

contract PublicRedEnvelope is BalanceManager {

    struct PublicEnvelope {
        address creator;
        uint256 potSize;
        uint256 entryFee;
        string name;
        uint256 creatorReward;
        mapping(address => uint256) participantsAmount;
        address[] participants;
        mapping(address => uint256) winners;
    }

    mapping(uint256 => PublicEnvelope) public publicEnvelopes;
    mapping(address => uint256) public loyaltyPoints;
    
    uint256 public currentEnvelopeId = 0;
    uint256 public constant CREATOR_REWARD_PERCENTAGE = 10;
    uint256 public constant FEE_PERCENTAGE = 1;

    event PublicEnvelopeCreated(uint256 envelopeId, address creator, uint256 entryFee);
    event EnteredEnvelope(uint256 envelopeId, address participant);
    event PublicEnvelopeDistributed(uint256 envelopeId);

    function createPublicEnvelope(string memory _name, uint256 _entryFee, uint256 _potSize) external payable {
        require(msg.value == _potSize, "Amount sent doesn't match the pot size.");

        PublicEnvelope storage envelope = publicEnvelopes[++currentEnvelopeId];
        envelope.creator = msg.sender;
        envelope.entryFee = _entryFee;
        envelope.potSize = _potSize;
        envelope.name = _name;
        envelope.creatorReward = (_potSize * CREATOR_REWARD_PERCENTAGE) / 100;

        emit PublicEnvelopeCreated(currentEnvelopeId, msg.sender, _entryFee);
    }

    function enterEnvelope(uint256 envelopeId) external payable {
        PublicEnvelope storage envelope = publicEnvelopes[envelopeId];
        require(msg.value == envelope.entryFee, "Incorrect entry fee");

        envelope.participantsAmount[msg.sender] = msg.value;

        if(envelope.participantsAmount[msg.sender] == msg.value) {
            envelope.participants.push(msg.sender);
        }

        loyaltyPoints[msg.sender] += msg.value;
        emit EnteredEnvelope(envelopeId, msg.sender);
    }

    function distributeRewards(uint256 envelopeId) external {
        PublicEnvelope storage envelope = publicEnvelopes[envelopeId];
        require(msg.sender == envelope.creator, "Only creator can distribute rewards");

        uint256 totalFee = (envelope.potSize * FEE_PERCENTAGE) / 100;
        uint256 distributablePot = envelope.potSize - totalFee - envelope.creatorReward;

        for (uint i = 0; i < envelope.participants.length; i++) {
            address participant = envelope.participants[i];

            uint256 reward = calculateReward(participant, envelopeId);
            envelope.winners[participant] = reward;

            uint256 loyaltyPercentage = (reward * 100) / distributablePot;
            uint256 pointsToSubtract = (loyaltyPoints[participant] * loyaltyPercentage) / 100;
            loyaltyPoints[participant] -= pointsToSubtract;
            
            addToBalance(participant, reward);
        }

        addToBalance(envelope.creator, envelope.creatorReward);
        emit PublicEnvelopeDistributed(envelopeId);
    }

    function calculateReward(address participant, uint256 envelopeId) internal view returns(uint256) {
        PublicEnvelope storage envelope = publicEnvelopes[envelopeId];
        uint256 totalLoyaltyPoints = 0;

        for (uint256 i = 0; i < envelope.participants.length; i++) {
            totalLoyaltyPoints += loyaltyPoints[envelope.participants[i]];
        }

        uint256 baseShare = (envelope.potSize * loyaltyPoints[participant]) / totalLoyaltyPoints;
        uint256 randomBias = 80 + random(envelopeId) % 41;
        uint256 finalReward = (baseShare * randomBias) / 100;

        return finalReward;
    }

    function random(uint256 seed) private view returns(uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, seed)));
    }

   function getAllEnvelopes() external view returns(uint256[] memory, string[] memory, uint256[] memory, uint256[] memory) {
    uint256[] memory ids = new uint256[](currentEnvelopeId);
    string[] memory names = new string[](currentEnvelopeId);
    uint256[] memory potSizes = new uint256[](currentEnvelopeId);
    uint256[] memory entryFees = new uint256[](currentEnvelopeId);

    for(uint256 i = 1; i <= currentEnvelopeId; i++) {
        PublicEnvelope storage envelope = publicEnvelopes[i];
        ids[i-1] = i;
        names[i-1] = envelope.name;
        potSizes[i-1] = envelope.potSize;
        entryFees[i-1] = envelope.entryFee;
    }

    return (ids, names, potSizes, entryFees);
}

}
