// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
contract FundMe {
    address public Owner;
    uint256 constant TARGET = 1000 * 10 ** 18;
    AggregatorV3Interface internal dataFeed;
    uint256 MINVALUES = 100 * 10 ** 18;
    uint256 deploymentTimestamp;
    uint blockTime;
    bool getFundSuccss1 = false;
    address ERC20Addr;
    constructor(uint _blockTime) {
        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        Owner = msg.sender;
        deploymentTimestamp = block.timestamp;
        blockTime = _blockTime;
    }
    mapping(address => uint256) public FundertoAcount;

    function fund() external payable {
        require(ethToUSD(msg.value) >= MINVALUES, "don't have enough money");
        require(block.timestamp<=deploymentTimestamp + blockTime,"Fund is over");
        FundertoAcount[msg.sender] = msg.value;
    }

    function setERC20Addr(address erc20)public onlyOwner{
        ERC20Addr=erc20;
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        (
            ,
            /* uint80 roundId */ int256 answer,
            ,
            /*uint256 startedAt*/ ,
            /*uint256 updatedAt*/
        ) = /*uint80 answeredInRound*/
            dataFeed.latestRoundData();
        return answer;
    }
    function ethToUSD(uint256 ethAcount) internal view returns (uint256) {
        uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());
        return (ethAcount * ethPrice) / (10 ** 8);
    }
    function getfund() external fundOver onlyOwner{
        require(
            ethToUSD(address(this).balance) >= TARGET,
            "fund is not enough"
        );
        bool succss;
        (succss, ) = payable(msg.sender).call{value: address(this).balance}("");
        FundertoAcount[msg.sender] = 0;
        getFundSuccss1=true;
    }
    function changeOwner(address newOwner) public onlyOwner{
        Owner = newOwner;
    }
    function refund() external fundOver{
        require(ethToUSD(address(this).balance) < TARGET, "fund is  enough");
        require(FundertoAcount[msg.sender] != 0, "you are used refund");
        bool succss;
        (succss, ) = payable(msg.sender).call{
            value: FundertoAcount[msg.sender]
        }("");
        FundertoAcount[msg.sender] = 0;
    }
    modifier fundOver() {
        require(block.timestamp>deploymentTimestamp+blockTime,"Fund is not over");
        _;
    }
    modifier onlyOwner(){
        require(Owner==msg.sender,"you are not Owner");
        _;
    }
    function getFundSuccss ()public view  returns (bool){
        return getFundSuccss1;
    }
    function setFundertoAcount(address cc,uint256 values)external    {
        require(msg.sender==ERC20Addr,"you are not ERC20");
        FundertoAcount[cc]=values;
    }
}
