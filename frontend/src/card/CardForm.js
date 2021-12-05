import React, { useState } from 'react';

/**
 * 
 * @param {object} props passed from parent route
 * 
 * @returns CardForm component for Add Card & Edit Card routes
 */
function CardForm({
  onSuccess,                  // form onSubmit handler
  onCancel,                   // cancel button onClick handler
  initialState,               // saved Card state (or blank)
  doneButtonLabel = "Done",   // cancel button label
}) {
  const [formData, setFormData] = useState({...initialState});

  const handleInputChange = ({target}) => {  
    setFormData({                            // saves form input in formData
      ...formData,                           // state object as value of key
      [target.name]: target.value            // matching input field name
    });
  };

  function submitHandler(event) {    
    event.preventDefault();          // calls onSuccess function (newCard or
    onSuccess({ ...formData });      // editCard) depending on prop passed in
    setFormData({...initialState});  // from parent route
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="card-front">
          Front: 
        </label>
        <textarea 
          value={formData.front}
          onChange={handleInputChange}
          name="front"
          id="card-front"
          required={true}
          className="form-control" 
          rows="5"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="card-back">
          Back:
        </label>
        <textarea 
          required={true}
          value={formData.back}
          onChange={handleInputChange}
          name="back"
          id="card-back"
          className="form-control" 
          rows="5"
        />
      </div>
      
      <div className="mb-3">
        <button type="button"  onClick={onCancel} className="btn btn-secondary mr-2">
          {doneButtonLabel}
        </button>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CardForm;