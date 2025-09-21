
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {PrintInfo} from "./PrintfInfo.sol";
contract HelloFactory {
    PrintInfo[] pfs;
    function creatprint ()public {
        PrintInfo pf =new  PrintInfo();
        pfs.push(pf);
    }
    function callregistry(uint _index,string memory str,uint _id)public {
        pfs[_index].registryInfo(str,_id);
    }
    function callprintinfo(uint _index,uint _id)public view returns (string memory) {
       return  pfs[_index].printinfo(_id);
    }
    function callprintmap(uint _index,uint _id)public view  returns (string memory){
       return  pfs[_index].printmap(_id);
    }
}