// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BalanceManager.sol";

contract PublicRedEnvelope is BalanceManager {

    struct PublicEnvelope {
        address creator;
        uint256 potSize;
        uint256 entryFee;
        uint256 creatorReward;
        mapping(address => uint256) participants;
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

    function createPublicEnvelope(uint256 _entryFee, uint256 _potSize) external {
        PublicEnvelope storage envelope = publicEnvelopes[++currentEnvelopeId];
        envelope.creator = msg.sender;
        envelope.entryFee = _entryFee;
        envelope.potSize = _potSize;
        envelope.creatorReward = (_potSize * CREATOR_REWARD_PERCENTAGE) / 100;

        subtractFromBalance(msg.sender, _potSize);
        emit PublicEnvelopeCreated(currentEnvelopeId, msg.sender, _entryFee);
    }

    function enterEnvelope(uint256 envelopeId) external payable {
        PublicEnvelope storage envelope = publicEnvelopes[envelopeId];
        require(msg.value == envelope.entryFee, "Incorrect entry fee");

        addToBalance(msg.sender, msg.value);
        envelope.potSize += msg.value;
        envelope.participants[msg.sender] = msg.value;

        loyaltyPoints[msg.sender] += msg.value;
        emit EnteredEnvelope(envelopeId, msg.sender);
    }

    function distributeRewards(uint256 envelopeId) external {
        PublicEnvelope storage envelope = publicEnvelopes[envelopeId];
        require(msg.sender == envelope.creator, "Only creator can distribute rewards");

        uint256 totalFee = (envelope.potSize * FEE_PERCENTAGE) / 100;
        uint256 distributablePot = envelope.potSize - totalFee - envelope.creatorReward;

        for(address participant : envelope.participants) {
            uint256 reward = calculateReward(participant, distributablePot);
            envelope.winners[participant] = reward;

            // Subtract the equivalent percentage of loyalty points based on their winnings
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
		    // Sum the loyalty points of all participants
		    for (uint256 i = 0; i < envelope.participants.length; i++) {
		        totalLoyaltyPoints += loyaltyPoints[envelope.participants[i]];
		    }
		    
		    // Calculate base share
		    uint256 baseShare = (envelope.potSize * loyaltyPoints[participant]) / totalLoyaltyPoints;
		    
		    // Apply random bias. For demonstration, we use a bias in the range [0.8, 1.2].
		    uint256 randomBias = 80 + random(envelopeId) % 41;  // This gives a random number in the range [80, 120]
		    uint256 finalReward = (baseShare * randomBias) / 100;  // Adjust the baseShare by the bias
		
		    return finalReward;
		}
}
