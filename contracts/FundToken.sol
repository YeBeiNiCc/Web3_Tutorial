// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract FundToken{
    string public TokenName;
    string public TokenSymbol;
    uint256 public totalToken;
    address public Owner;
    constructor (string memory _TokenName,string memory _TokenSymbol){
        TokenName=_TokenName;
        TokenSymbol=_TokenSymbol;
        Owner=msg.sender;
    }
    mapping (address => uint) balances;
    // function getTotalToken(uint256 account) public  {
    //     require(Owner==msg.sender,"you are not Owner");
    //     balances[Owner]+=account;
    //     totalToken += account;
    // }
    function getToken (uint256 account) public {
        // require(totalToken>=account,"totalToken is not enough");
        totalToken+=account;
        balances[msg.sender]+=account;
    }
    function transferToken(address payee,uint256 account)public {
        require(balances[msg.sender]>=account,"you are not have enough Token");
        balances[msg.sender]-=account;
        balances[payee]+=account;
    }
    function getTokenbyAddress (address addr)public view  returns (uint256){
        return balances[addr];
    }
}