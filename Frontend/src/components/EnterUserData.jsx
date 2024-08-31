import React from "react";
import { db } from "../firebaseConfig";

const EnterUserData = () => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="measurement-form">
        <h2>Enter Your Key Measurements</h2>

        {/* Essential Fields */}
        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Chest/Bust Circumference (cm):
          <input
            type="number"
            name="chest"
            value={formData.chest}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Waist Circumference (cm):
          <input
            type="number"
            name="waist"
            value={formData.waist}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Hip Circumference (cm):
          <input
            type="number"
            name="hip"
            value={formData.hip}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Shoulder Width (cm):
          <input
            type="number"
            name="shoulder"
            value={formData.shoulder}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Inseam Length (cm):
          <input
            type="number"
            name="inseam"
            value={formData.inseam}
            onChange={handleChange}
            required
          />
        </label>

        {/* Optional Fields */}
        <h3>Optional Measurements (For Enhanced Accuracy)</h3>
        <label>
          Neck Circumference (cm):
          <input
            type="number"
            name="neck"
            value={formData.neck}
            onChange={handleChange}
          />
        </label>
        <label>
          Arm Length (cm):
          <input
            type="number"
            name="arm"
            value={formData.arm}
            onChange={handleChange}
          />
        </label>
        <label>
          Torso Length (cm):
          <input
            type="number"
            name="torso"
            value={formData.torso}
            onChange={handleChange}
          />
        </label>

        {/* Photo Capture */}
        <label>
          Capture Face Photo:
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handlePhotoCapture}
            required
          />
        </label>

        {/* Submit Button */}
        <button type="submit">Submit Measurements</button>
      </form>
    </div>
  );
};

export default EnterUserData;
