// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 < 0.9.0;


contract DStorage{
    string public name ="DStorage";
    uint public fileCount=1;

    struct File{
        uint fileId;
        string fileHash;
        uint fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint uploadTime;
        address payable uploader;
    }

    mapping(uint => File) public files;
    event FileUploaded(
        uint fileId,
        string fileHash,
        uint fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint uploadTime,
        address payable uploader
    );

    function uploadFile(
        string memory _fileHash,
        uint _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription
        ) public
    {
        //TODO: validate data

        require(bytes(_fileHash).length > 0,"File Hash Must Be Provided");
        require(bytes(_fileType).length > 0,"File Type Must Be Provided");
        require(bytes(_fileName).length > 0,"File Name Must Be Provided");
        require(bytes(_fileDescription).length > 0,"File Description Must Be Provided");
        require(msg.sender != address(0x0));
        require(_fileSize > 0);

        //TODO: add a new file
        files[fileCount]=File(
            fileCount,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            block.timestamp,
            payable(msg.sender)
            );
        fileCount++;

        emit FileUploaded(
            fileCount,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            block.timestamp,
            payable(msg.sender)
        );
    }


}