import React, { useState } from 'react';

/**
 * 
 * @param {object} props passed from parent route
 * 
 * @returns DeckForm component for Create Deck & Edit Deck routes
 */
function DeckForm({
  onSuccess,          // form onSubmit handler
  onCancel,           // cancel button onClick handler
  initialFormState = { name: "", description: "" }, // saved deck state (or blank)
}) {
  const [ formData, setFormData ] = useState({...initialFormState});

  const handleInputChange = ({target}) => {  
    setFormData({                            // saves form input in formData
      ...formData,                           // state object as value of key 
      [target.name]: target.value            // matching input field name
    });
  };

  async function handleSubmit(event) { 
    event.preventDefault();              // calls onSuccess function (newDeck 
    event.stopPropagation();             // or editDeck) depending on prop 
    onSuccess(formData);                 // passed in from parent route 
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={formData.name}
              placeholder= "Deck name"
              onChange={handleInputChange}
              id="name" 
              name="name"
              className="form-control" 
              type="text"
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              required={true}
              placeholder="Brief description of the deck"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <button 
            type="reset" 
            className="btn btn-secondary mr-2" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mr-2">
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default DeckForm;