// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {FundMe} from "./FundMe.sol";

contract FundMeTokenERC20 is ERC20{
    FundMe fundMe;
    constructor(address fundmeaddr) ERC20("FundMeTokenERC20","FT"){
        fundMe = FundMe(fundmeaddr);
    }
    function accoutToTokens (uint256 accout)public {
        require(fundMe.FundertoAcount(msg.sender)>=accout,"you dont have enough money");
        require(fundMe.getFundSuccss(),"fund is not over");
        _mint(msg.sender, accout);
        fundMe.setFundertoAcount(msg.sender,fundMe.FundertoAcount(msg.sender)-accout);
    }
    function claim (uint256 cc)public {
        require(balanceOf(msg.sender)>=cc,"you dont have enough tokens");
        _burn(msg.sender, cc);
    }

}