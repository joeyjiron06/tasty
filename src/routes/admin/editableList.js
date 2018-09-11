import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button
} from '@material-ui/core';

class EditableList extends Component {
  render() {
    const { items, placeholder, onChange, buttonText } = this.props;

    return (
      <div>
        {items.map((text, index) => (
          <div key={index}>
            <TextField
              placeholder={placeholder}
              value={text}
              fullWidth={true}
              gutterBottom={true}
              onChange={e => {
                const { value } = e.target;
                const newItems = [...items];
                newItems[index] = value;
                onChange(newItems);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      data-testid='editableListRemoveButton'
                      onClick={() => {
                        const newItems = items.filter(
                          (item, idx) => idx !== index
                        );
                        onChange(newItems);
                      }}
                    >
                      <Icon>cancel</Icon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        ))}

        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            const newItems = [...items, ''];
            onChange(newItems);
          }}
        >
          {buttonText}
        </Button>
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
