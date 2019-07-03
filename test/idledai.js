const { expectEvent, singletons, constants, BN } = require('openzeppelin-test-helpers');
const { ZERO_ADDRESS } = constants;

const IdleDAI = artifacts.require('IdleDAI');
const cDAIMock = artifacts.require('cDAIMock');
const iDAIMock = artifacts.require('iDAIMock');
const DAIMock = artifacts.require('DAIMock');

contract('IdleDAI', function ([_, registryFunder, creator]) {
  beforeEach(async function () {
    this.DAIMock = await DAIMock.new();
    this.cDAIMock = await cDAIMock.new(this.DAIMock.address, {from: creator});
    this.iDAIMock = await iDAIMock.new(this.DAIMock.address, {from: creator});
    this.one = new BN('1e18');
    this.ETHAddr = '0x0000000000000000000000000000000000000000';

    this.erc1820 = await singletons.ERC1820Registry(registryFunder);
    this.token = await IdleDAI.new(
      this.cDAIMock.address,
      this.iDAIMock.address,
      this.DAIMock.address,
      { from: creator }
    );
  });

  it('has a name', async function () {
    (await this.token.name()).should.equal('IdleDAI');
  });

  it('has a symbol', async function () {
    (await this.token.symbol()).should.equal('IDLEDAI');
  });

  it('has a cDAI addr', async function () {
    (await this.token.cToken()).should.equal(this.cDAIMock.address);
  });

  it('has a iDAI addr', async function () {
    (await this.token.iToken()).should.equal(this.iDAIMock.address);
  });

  it('has a DAI addr', async function () {
    (await this.token.token()).should.equal(this.DAIMock.address);
  });

  // it('assigns the initial total supply to the creator', async function () {
  //   const totalSupply = await this.token.totalSupply();
  //   const creatorBalance = await this.token.balanceOf(creator);
  //
  //   creatorBalance.should.be.bignumber.equal(totalSupply);
  //
  //   await expectEvent.inConstruction(this.token, 'Transfer', {
  //     from: ZERO_ADDRESS,
  //     to: creator,
  //     value: totalSupply,
  //   });
  // });
});