import React, { useState } from "react";
import axios from "axios";

const CreateRoom = () => {
  const [formData, setFormData] = useState({
    photos: [],
    size: "",
    capacity: "",
    price: "",
    description: "",
    amenities: "",
    BedType: "",
    status: "available",
    hotelName: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, photos: fileUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!formData.photos.length) newErrors.photos = "At least one photo is required.";
    if (!formData.capacity) newErrors.capacity = "Capacity is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    if (!formData.amenities) newErrors.amenities = "Amenities are required.";
    if (!formData.BedType) newErrors.BedType = "Bed type is required.";
    if (!formData.hotelName) newErrors.hotelName = "Hotel name is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/room/create", {
        ...formData,
        amenities: formData.amenities.split(",").map((item) => item.trim()), // Convert amenities to an array
      });

      alert("Room created successfully!");
      console.log(response.data);
      setFormData({
        photos: [],
        size: "",
        capacity: "",
        price: "",
        description: "",
        amenities: "",
        BedType: "",
        status: "available",
        hotelName: "",
      });
    } catch (error) {
      console.error("Error creating room:", error.response?.data || error.message);
      alert("Failed to create room. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-room-page">
      <h1>Create Room</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Photos:</label>
          <input type="file" multiple onChange={handleFileChange} />
          {errors.photos && <p className="error">{errors.photos}</p>}
        </div>

        <div>
          <label>Size (sq ft):</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Capacity:</label>
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
          {errors.capacity && <p className="error">{errors.capacity}</p>}
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label>Amenities (comma-separated):</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
          />
          {errors.amenities && <p className="error">{errors.amenities}</p>}
        </div>

        <div>
          <label>Bed Type:</label>
          <input
            type="text"
            name="BedType"
            value={formData.BedType}
            onChange={handleChange}
          />
          {errors.BedType && <p className="error">{errors.BedType}</p>}
        </div>

        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div>
          <label>Hotel Name:</label>
          <input
            type="text"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
          />
          {errors.hotelName && <p className="error">{errors.hotelName}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Room"}
        </button>
      </form>

      <style jsx>{`
        .create-room-page {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        form div {
          margin-bottom: 15px;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        input,
        textarea,
        select {
          width: 100%;
          padding: 8px;
          margin-bottom: 5px;
        }

        .error {
          color: red;
          font-size: 0.9rem;
        }

        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }

        button:disabled {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default CreateRoom;