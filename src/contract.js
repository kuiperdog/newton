import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com'));
const comoContract = '0xc3E5ad11aE2F00c740E74B81f134426A3331D950';
const proxy = '0x3492d90074742740ce1d6bf91316232e97eaf935';

async function call(id, name, types) {
    return web3.eth.call({
        to: comoContract,
        data: web3.eth.abi.encodeFunctionSignature({
            name: name,
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: 'pollId'
            }]
        }) + web3.eth.abi.encodeParameters(['uint256'], [id]).substring(2),
        from: proxy,
    })
    .catch((err) => {
        console.error(err)
    })
    .then((res) => {
        return res
    })
}

export async function getCandidates(id) {
    return web3.eth.abi.decodeParameters(['string[]'], await call(id, 'candidates'))[0]
}

export async function getTotalComo(id) {
    return web3.eth.abi.decodeParameters([
        'string',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'bool'], await call(id, 'polls'))[4] / Math.pow(10, 18)
}

export async function votesPerCandidates(id) {
    let data = web3.eth.abi.decodeParameters(['uint256[]'], await call(id, 'votesPerCandidates'))[0]
    let cleanData = []
    data.forEach((value, i) => cleanData[i] = Math.round(value / Math.pow(10, 18)))
    return cleanData
}
