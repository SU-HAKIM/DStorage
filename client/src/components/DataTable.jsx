import React from "react";

const baseUrl = "https://ipfs.infura.io/ipfs/";

const DataTable = ({ files }) => {
  return (
    <table class="table table-light table-sm w-50 mx-auto mt-2 table-bordered border-primary">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>description</th>
          <th>Type</th>
          <th>Size</th>
          <th>Date</th>
          <th>uploader</th>
          <th>Hash</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => {
          return (
            <tr key={file.fileId}>
              <td>{file.fileId}</td>
              <td>{file.fileName}</td>
              <td>{file.fileDescription}</td>
              <td>{file.fileType}</td>
              <td>{file.fileSize}</td>
              <td>{new Date(Number(file.uploadTime)).toLocaleString()}</td>
              <td>{file.uploader}</td>
              <td>
                <a href={`${baseUrl}${file.fileHash}`} target="_hakim">
                  {file.fileHash}
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
