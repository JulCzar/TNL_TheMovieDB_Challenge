import React from 'react'
import Select, { GroupTypeBase } from 'react-select'
import { colors } from '../../constants/colors'

class MultiSelect<
  T,
  V extends GroupTypeBase<T> = GroupTypeBase<T>
> extends Select<T, true, V> {
  render() {
    return (
      <Select
        {...this.props}
        hideSelectedOptions
        styles={{
          container: provided => ({
            ...provided,
            maxWidth: 450,
            width: '100%',

            ':focus': {
              borderColor: '#fff9',
            },
          }),
          control: provided => ({
            ...provided,
            background: '#1C202F',
            borderColor: '#1C202F',
            ':hover': {
              borderColor: '#1C202F',
            },
          }),
          indicatorSeparator: () => ({}),
          multiValue: provided => ({
            ...provided,
            backgroundColor: '#272E3E',
          }),
          multiValueLabel: provided => ({
            ...provided,
            color: colors['font.600'],
          }),
        }}
      />
    )
  }
}

export default MultiSelect
