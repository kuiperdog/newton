const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));

const encodedFunctionCall = web3.eth.abi.encodeFunctionSignature({
    name: 'candidates',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'pollId'
    }]
});

const encodedParamaters = web3.eth.abi.encodeParameters(['uint256'], [68]);

web3.eth.call({
    to: '0xc3E5ad11aE2F00c740E74B81f134426A3331D950', // contract
    data: encodedFunctionCall + encodedParamaters.substr(2),
    from: '0x3492d90074742740ce1d6bf91316232e97eaf935', // proxy
}, (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(web3.eth.abi.decodeParameters(['string[]'], result)[0]);
    }
});
