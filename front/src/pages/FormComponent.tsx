import React, { useState } from "react";

type FormProps = {
  onSubmit: (formValues: any) => void;
};

const FormComponent: React.FC<FormProps> = () => {
  const [location, setLocation] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues = { location, name, price };
    fetch("http://localhost:8080/inventories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setLocation("");
    setName("");
    setPrice(undefined);
    setIsSubmitted(true);
  };

  return (
    <div className='container d-flex justify-content-center'>
      <form onSubmit={handleSubmit} className='my-4'>
        <div className='mb-3'>
          <label htmlFor='location' className='form-label'>
            Location
          </label>
          <select
            id='location'
            className='form-select mx-2'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          >
            <option value=''>Choose Location:</option>
            <option value='Main Office'>Main Office</option>
            <option value='Cavea Gallery'>Cavea Gallery</option>
            <option value='Cavea Tbilisi Mall'>Cavea Tbilisi Mall</option>
            <option value='Cavea East Point'>Cavea East Point</option>
            <option value='Cavea City Mall'>Cavea City Mall</option>
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            id='name'
            className='form-control'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
            Price
          </label>
          <div className='input-group'>
            <span className='input-group-text'>₾</span>
            <input
              type='number'
              id='price'
              className='form-control'
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              required
            />
            <span className='input-group-text'>.00</span>
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        {isSubmitted && (
          <div className='alert alert-success diplay-inline mt-3' role='alert'>
            Inventory Added
          </div>
        )}
      </form>
    </div>
  );
};

export default FormComponent;
