// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract PrintInfo {
    struct Info{
        string info;
        uint256 id;
        address add;
    }

    Info[] infos;
    mapping (uint _id=>Info) infoMapping;

    function registryInfo (string memory str,uint _id)  public    {
        Info memory info=Info(str,_id,msg.sender);
        infoMapping[_id]=info;
        infos.push(info);
    }

    function printinfo (uint _id)public view  returns (string memory) {
        for (uint i = 0;i<infos.length;i++){
            if (infos[i].id==_id){
                return infos[i].info;
            }
        }
        return "not found";
    }
    function printmap(uint _id) public view returns (string memory){
        require(infoMapping[_id].add !=address(0x0)  ,"not found1111111111");
        return infoMapping[_id].info;
    }
}