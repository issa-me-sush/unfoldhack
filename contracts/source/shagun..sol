// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrivateRedEnvelope {
    struct PrivateEnvelope {
        string name;
        address payable creator;
        uint256 totalAmount;
        uint256 claimedCount;
        address payable[] recipients;
        mapping(address => bool) hasClaimed;
    }
    
    uint256 private currentEnvelopeId = 0;
    mapping(uint256 => PrivateEnvelope) public privateEnvelopes;
    mapping(address => uint256) public userBalances;  // Track user native token credits

    event PrivateEnvelopeCreated(uint256 envelopeId, address creator, uint256 amount, string name, address payable[] recipients);
    event PrivateEnvelopeClaimed(uint256 envelopeId, address claimer, uint256 amount);
    event FundsWithdrawn(address user, uint256 amount);

    function createPrivateEnvelope(string memory _name, address payable[] memory _recipients) public payable {
        require(msg.value > 0, "Amount should be greater than zero");

        currentEnvelopeId++;

        PrivateEnvelope storage newEnvelope = privateEnvelopes[currentEnvelopeId];
        newEnvelope.name = _name;
        newEnvelope.creator = payable(msg.sender);
        newEnvelope.totalAmount = msg.value;
        newEnvelope.recipients = _recipients;

        emit PrivateEnvelopeCreated(currentEnvelopeId, msg.sender, msg.value, _name, _recipients);
    }

    function claimPrivateEnvelope(uint256 envelopeId) public {
        PrivateEnvelope storage envelope = privateEnvelopes[envelopeId];
        
        require(!envelope.hasClaimed[msg.sender], "Already claimed");
        require(isRecipient(msg.sender, envelopeId), "Not a recipient");
        
        uint256 claimableAmount;
        if (envelope.claimedCount < envelope.recipients.length - 1) {
            claimableAmount = randomAmount(envelope.totalAmount);
            envelope.totalAmount -= claimableAmount;
        } else {
            claimableAmount = envelope.totalAmount;
        }
        
        envelope.claimedCount++;
        envelope.hasClaimed[msg.sender] = true;
        
        userBalances[msg.sender] += claimableAmount;  // Update user's native token credits
        emit PrivateEnvelopeClaimed(envelopeId, msg.sender, claimableAmount);
    }

    function isRecipient(address _addr, uint256 envelopeId) public view returns(bool) {
        PrivateEnvelope storage envelope = privateEnvelopes[envelopeId];
        for (uint i = 0; i < envelope.recipients.length; i++) {
            if (envelope.recipients[i] == _addr) {
                return true;
            }
        }
        return false;
    }

    function randomAmount(uint256 total) internal view returns(uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % total;
    }

    function withdraw(uint256 amount) public {
        require(userBalances[msg.sender] >= amount, "Insufficient funds");
        userBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }
}
