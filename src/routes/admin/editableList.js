import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditableList extends Component {
  render() {
    const { items, placeholder, onChange, buttonText } = this.props;

    return (
      <div>
        {items.map((text, index) => (
          <div key={index}>
            <input
              placeholder={placeholder}
              value={text}
              onChange={e => {
                const { value } = e.target;
                const newItems = [...items];
                newItems[index] = value;
                onChange(newItems);
              }}
            />

            <img
              src='remove.png'
              alt='remove item'
              onClick={() => {
                const newItems = items.filter((item, idx) => idx !== index);
                onChange(newItems);
              }}
            />
          </div>
        ))}

        <button
          onClick={() => {
            const newItems = [...items, ''];
            onChange(newItems);
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

EditableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string
};

EditableList.defaultTypes = {
  onChange: () => {},
  buttonText: 'Add'
};

export default EditableList;
