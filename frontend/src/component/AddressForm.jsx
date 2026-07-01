import React, { useState } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";

function AddressForm({ formData, setFormData }) {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);

  const countries = Country.getAllCountries();

  // Country Change
  const changeCountry = (value) => {
    setCountry(value);
    setState(null);

    setFormData((prev) => ({
      ...prev,
      country: value.name,
      state: "",
    }));
  };

  // State Change
  const changeState = (value) => {
    setState(value);

    setFormData((prev) => ({
      ...prev,
      state: value.name,
    }));
  };

  // Letters Only
  const handleLetters = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.replace(/[^a-zA-Z ]/g, ""),
    }));
  };

  // Numbers Only
  const handleNumbers = (e, field, maxLength) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, maxLength);

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      {/* First Name & Last Name */}

      <div className="w-full flex gap-4">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleLetters}
          className="w-1/2 h-[50px] bg-white rounded-md px-5 text-black"
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleLetters}
          className="w-1/2 h-[50px] bg-white rounded-md px-5 text-black"
          required
        />
      </div>

      {/* Email */}

      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
        className="w-full h-[50px] mt-4 bg-white rounded-md px-5 text-black"
        required
      />

      {/* Street */}

      <input
        type="text"
        placeholder="Street"
        name="street"
        value={formData.street}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            street: e.target.value,
          }))
        }
        className="w-full h-[50px] mt-4 bg-white rounded-md px-5 text-black"
        required
      />

      {/* Country & State */}

      <div className="flex gap-4 mt-4">
        <Select
          options={countries}
          getOptionLabel={(country) => country.name}
          getOptionValue={(country) => country.isoCode}
          value={country}
          onChange={changeCountry}
          placeholder="Select Country"
          className="w-1/2 text-black"
        />

        <Select
          options={
            country ? State.getStatesOfCountry(country.isoCode) : []
          }
          getOptionLabel={(state) => state.name}
          getOptionValue={(state) => state.isoCode}
          value={state}
          onChange={changeState}
          placeholder="Select State"
          className="w-1/2 text-black"
        />
      </div>

      {/* City & Pincode */}

      <div className="flex gap-4 mt-4">
        <input
          type="text"
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={handleLetters}
          className="w-1/2 h-[50px] bg-white rounded-md px-5 text-black"
          required
        />

        <input
          type="text"
          placeholder="Pincode"
          name="pinCode"
          value={formData.pinCode}
          maxLength={6}
          onChange={(e) => handleNumbers(e, "pinCode", 6)}
          className="w-1/2 h-[50px] bg-white rounded-md px-5 text-black"
          required
        />
      </div>

      {/* Phone */}

      <input
        type="tel"
        placeholder="Phone Number"
        name="phone"
        value={formData.phone}
        maxLength={10}
        onChange={(e) => handleNumbers(e, "phone", 10)}
        className="w-full h-[50px] mt-4 bg-white rounded-md px-5 text-black"
        required
      />
    </div>
  );
}

export default AddressForm;