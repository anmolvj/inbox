const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //this is caps because it is a constructor funciton

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts, inbox;
const INITIAL_STRING = 'Hi There!'

beforeEach(async () => {
    // GET A LIST OF ALL ACCOUNTS
    accounts = await web3.eth.getAccounts()

    //USE ONE OF THOSE ACCOUNTS TO DEPLOY THE CONTRACT
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
        arguments: [INITIAL_STRING]
    })
    .send({
        from: accounts[0],
        gas: '1000000'
    })

    // inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    }); 

    it('can update the message using setMessage()', async () => {
        const NEW_STRING = "hakuna Matata!";
        await inbox.methods.setMessage(NEW_STRING).send({
            from: accounts[0],
            gas: '1000000'
        });
        const message = await inbox.methods.message().call();
        assert.equal(message, NEW_STRING);
    });
})