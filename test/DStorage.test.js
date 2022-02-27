var DStorage = artifacts.require("./DStorage.sol");

contract("DStorage", (accounts) => {
    let storage;

    before(async () => {
        storage = await DStorage.deployed();
    })

    describe("it has a name", async () => {
        it("has a name", async () => {
            let name = await storage.name();
            assert.equal(name, "DStorage");
        })
    })
})