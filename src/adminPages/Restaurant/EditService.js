import React from 'react'

export default function EditService() {
    return (
        <div className='container'>
            <h2>Edit Service </h2>
            <form>
            <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Current Images</label>
                    {imagePaths.length > 0 ? (
                        <div className="d-flex flex-wrap">
                            {imagePaths.map((imagePath, index) => (
                                <div key={index} className="mb-2 mr-2">
                                    <img
                                        src={`http://localhost:5265${imagePath}`}
                                        alt={`Image ${index}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Upload New Images</label>
                    <input
                        type="file"
                        className="form-control-file"
                        onChange={handleImageChange}
                        multiple
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
