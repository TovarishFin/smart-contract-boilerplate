pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

/**
  @title ExampleCoin is a simple example token meant as a placeholder for your project.
  @dev ExampleCoin is an ERC20 compliant token extended from OpenZeppelin's StandardToken.
 */
contract ExampleCoin is StandardToken {
  string public name;
  string public symbol;
  uint256 public decimals;

  /**
    @dev The constructor sets storage for key ERC20 compliant variables
    @param _name the name of the token (ex. ExampleCoin)
    @param _symbol the symbol of the token (ex. EXC)
    @param _decimals the decimals for the token.
    should always be 1e18 unless you have a VERY good reason
   */
  constructor(
    string _name,
    string _symbol,
    uint256 _decimals,
    uint256 _totalSupply
  )
    public
  {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply_ = _totalSupply;
    balances[msg.sender] = _totalSupply;
    emit Transfer(address(0), msg.sender, _totalSupply);
  }
}
