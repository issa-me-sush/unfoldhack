export const BMCONTRACT="0xAf9BaAa33190ADE25e838EdADee9713f0deD3795"

export const BMABI=

[
{
"inputs": [],
"name": "deposit",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "address",
"name": "user",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "FundAdded",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "address",
"name": "user",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "FundsWithdrawn",
"type": "event"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "withdraw",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"name": "userBalances",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
}
]

export const PRIVCONTRACT="0x0c14Bd40804Cb7265fBc89BAe035193f0F747E1F"

export const PRIVABI= 

[
{
"inputs": [
{
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
}
],
"name": "claimPrivateEnvelope",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "string",
"name": "_name",
"type": "string"
},
{
"internalType": "address payable[]",
"name": "_recipients",
"type": "address[]"
}
],
"name": "createPrivateEnvelope",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [],
"name": "deposit",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "address",
"name": "user",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "FundAdded",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "address",
"name": "user",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "FundsWithdrawn",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
},
{
"indexed": false,
"internalType": "address",
"name": "claimer",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "PrivateEnvelopeClaimed",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
},
{
"indexed": false,
"internalType": "address",
"name": "creator",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
},
{
"indexed": false,
"internalType": "string",
"name": "name",
"type": "string"
},
{
"indexed": false,
"internalType": "address payable[]",
"name": "recipients",
"type": "address[]"
}
],
"name": "PrivateEnvelopeCreated",
"type": "event"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "withdraw",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "_addr",
"type": "address"
},
{
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
}
],
"name": "isRecipient",
"outputs": [
{
"internalType": "bool",
"name": "",
"type": "bool"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"name": "privateEnvelopes",
"outputs": [
{
"internalType": "string",
"name": "name",
"type": "string"
},
{
"internalType": "address payable",
"name": "creator",
"type": "address"
},
{
"internalType": "uint256",
"name": "totalAmount",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "claimedCount",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"name": "userBalances",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
}
]

export const PUBCONTRACT = "0xe248aD9f74342423ee5c097874B9A253691E2Ad6"

export const PUBABI=

[
{
"inputs": [
{
"internalType": "uint256",
"name": "_entryFee",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "_potSize",
"type": "uint256"
}
],
"name": "createPublicEnvelope",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "deposit",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
}
],
"name": "distributeRewards",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
},
{
"indexed": false,
"internalType": "address",
"name": "participant",
"type": "address"
}
],
"name": "EnteredEnvelope",
"type": "event"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
}
],
"name": "enterEnvelope",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "address",
"name": "user",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "FundAdded",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "address",
"name": "user",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "FundsWithdrawn",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
},
{
"indexed": false,
"internalType": "address",
"name": "creator",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "entryFee",
"type": "uint256"
}
],
"name": "PublicEnvelopeCreated",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"internalType": "uint256",
"name": "envelopeId",
"type": "uint256"
}
],
"name": "PublicEnvelopeDistributed",
"type": "event"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "withdraw",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "CREATOR_REWARD_PERCENTAGE",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "currentEnvelopeId",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "FEE_PERCENTAGE",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"name": "loyaltyPoints",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"name": "publicEnvelopes",
"outputs": [
{
"internalType": "address",
"name": "creator",
"type": "address"
},
{
"internalType": "uint256",
"name": "potSize",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "entryFee",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "creatorReward",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"name": "userBalances",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
}
]