import React from "react";

const Main = ({
  description,
  handleDescriptionChange,
  handleBufferChange,
  upload,
}) => {
  return (
    <div className="card card-body mx-auto mt-4 bg-dark w-50">
      <h3 className="text-white mx-auto mb-2">Share Files</h3>
      <input
        type="text"
        name="description"
        aria-label="hidden"
        className="mb-2"
        placeholder="file description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <input
        type="file"
        name="file"
        aria-label="hidden"
        className="mb-2 text-white"
        onChange={handleBufferChange}
      />
      <button className="btn btn-primary my-2" onClick={upload}>
        Upload!
      </button>
    </div>
  );
};

export default Main;
