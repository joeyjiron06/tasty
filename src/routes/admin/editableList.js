import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button
} from '@material-ui/core';

const KEYCODE_ENTER = 13;
const KEYCODE_BACKSPACE = 8;

const EditableList = ({
  items,
  placeholder,
  onChange,
  buttonText,
  textClassName
}) => (
  <div>
    <div>
      {items.map((text, index) => (
        <div key={index}>
          <TextField
            autoFocus={!text && index === items.length - 1}
            placeholder={placeholder}
            value={text}
            fullWidth={true}
            className={textClassName}
            onChange={e => {
              const { value } = e.target;
              const newItems = [...items];
              newItems[index] = value;
              onChange(newItems);
            }}
            onKeyDown={e => {
              if (e.target.value && e.keyCode === KEYCODE_ENTER) {
                if (items[items.length - 1]) {
                  const newItems = [...items, ''];
                  onChange(newItems);
                }
              } else if (!e.target.value && e.keyCode === KEYCODE_BACKSPACE) {
                const newItems = items.filter((item, idx) => idx !== index);
                onChange(newItems);
              }
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
                    <Icon>close</Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
      ))}
    </div>

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

EditableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  textClassName: PropTypes.string.value,
  onEnterPressed: PropTypes.fn
};

EditableList.defaultTypes = {
  onChange: () => {},
  buttonText: 'Add'
};

export default EditableList;
