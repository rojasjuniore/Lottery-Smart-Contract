// We import Chai to use its asserting functions here.
const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Token contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.




  it("should deploy the contract", async function () {
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    console.log('owner', owner.address)
    console.log('addr1', addr1.address)

    const Token = await ethers.getContractFactory("Lottery");
    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.getBalance();
    console.log('ownerBalance', ownerBalance)

    const addr2Balance = await hardhatToken.getBalancePlayer(addr1.address);
    console.log('addr2Balance', addr2Balance)

    // to call the enter function we add them to players
    await hardhatToken.connect(addr1).enter({ value: ethers.utils.parseEther('0.1') });
    await hardhatToken.connect(addr2).enter({ value: ethers.utils.parseEther('0.1') });
    await hardhatToken.connect(addr3).enter({ value: ethers.utils.parseEther('0.1') });
    await hardhatToken.connect(addr4).enter({ value: ethers.utils.parseEther('0.1') });


    let playersLength = await hardhatToken.getPlayersLength();
    console.log('playersLength', playersLength)

    let getPlayersIndex = await hardhatToken.getPlayersIndex(1);
    console.log('getPlayersIndex', getPlayersIndex)

    let players = await hardhatToken.getPlayers();
    console.log('players', players)

    let manager = await hardhatToken.getManager();
    console.log('manager', manager)

    let winner = await hardhatToken.pickWinner({ from: owner.address });
    console.log('winner', winner)

  })



});