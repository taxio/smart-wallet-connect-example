// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

contract SmartWallet is Ownable, IERC1271 {
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;
  using ECDSA for bytes32;
  using Address for address;

  function isValidSignature(bytes32 _hash, bytes memory _signature) public view returns (bytes4 magicValue) {
    address signer = _hash.recover(_signature);
    if (owner() == signer) {
      return MAGICVALUE;
    } else {
      return 0xffffffff;
    }
  }

  function balance() external view returns (uint256) {
    return address(this).balance;
  }
}
