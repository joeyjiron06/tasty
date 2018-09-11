import React from 'react';
import EditableList from './editableList';
import { render, fireEvent } from 'react-testing-library';

describe('<EditableList />', () => {
  it('should render the items in the list', () => {
    const items = ['one', 'two'];
    const { getAllByPlaceholderText } = render(
      <EditableList placeholder='numbers' items={items} />
    );

    const inputEls = getAllByPlaceholderText('numbers');
    inputEls.forEach((el, index) => {
      expect(el.value).toBe(items[index]);
    });
  });

  it('should invoke the onChange callback when input changes', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <EditableList placeholder='numbers' items={['one']} onChange={onChange} />
    );

    const input = getByPlaceholderText('numbers');
    fireEvent.change(input, { target: { value: 'one1' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['one1']);
  });

  it('should invoke onChanged with a new item when the add button is clicked', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <EditableList items={['one']} onChange={onChange} buttonText='Add' />
    );

    getByText('Add').click();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['one', '']);
  });

  it('should remove an item when the "X" button is clicked', () => {
    const onChange = jest.fn();
    const { getAllByTestId } = render(
      <EditableList items={['one', 'two', 'three']} onChange={onChange} />
    );

    const removeButtonEls = getAllByTestId('editableListRemoveButton');
    removeButtonEls[1].click();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['one', 'three']);
  });
});
