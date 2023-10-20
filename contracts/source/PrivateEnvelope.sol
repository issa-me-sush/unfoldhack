
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BalanceManager.sol";

contract PrivateRedEnvelope is BalanceManager {
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

    event PrivateEnvelopeCreated(uint256 envelopeId, address creator, uint256 amount, string name, address payable[] recipients);
    event PrivateEnvelopeClaimed(uint256 envelopeId, address claimer, uint256 amount);

    function createPrivateEnvelope(string memory _name, address payable[] memory _recipients) public payable returns (uint256) {
        require(msg.value > 0, "Amount should be greater than zero");
        addToBalance(msg.sender, msg.value);  // Update balance in BalanceManager

        currentEnvelopeId++;

        PrivateEnvelope storage newEnvelope = privateEnvelopes[currentEnvelopeId];
        newEnvelope.name = _name;
        newEnvelope.creator = payable(msg.sender);
        newEnvelope.totalAmount = msg.value;
        newEnvelope.recipients = _recipients;

        emit PrivateEnvelopeCreated(currentEnvelopeId, msg.sender, msg.value, _name, _recipients);
        return currentEnvelopeId;
    }

    function claimPrivateEnvelope(uint256 envelopeId) public returns (uint256){
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

        subtractFromBalance(envelope.creator, claimableAmount);  // Update balance in BalanceManager
        addToBalance(msg.sender, claimableAmount);  // Update recipient balance

        emit PrivateEnvelopeClaimed(envelopeId, msg.sender, claimableAmount);
        return claimableAmount;
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
}
