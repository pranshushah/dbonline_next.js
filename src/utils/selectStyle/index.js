// const customStyles = {
//   control: (base, state) => ({
//     ...base,
//     border: 'none',
//     background: '#3e4452',
//   }),
//   placeholder: (base, state) => ({
//     ...base,
//     color: 'white',
//   }),
//   singleValue: (base, state) => ({
//     ...base,
//     color: 'rgb(230,230,230)',
//   }),
//   menu: (base, state) => ({
//     ...base,
//     background: '#282c34',
//     color: 'rgb(235, 235, 235)',
//   }),
//   groupHeading: (base, state) => ({
//     ...base,
//     background: '#282c34',
//     color: 'rgba(235, 235, 235, 0.7)',
//   }),
//   option: (base, state) => ({
//     ...base,
//     background:
//       state.isFocused && state.isSelected
//         ? '#4b5263'
//         : state.isSelected
//         ? '#dcbc4f'
//         : state.isFocused
//         ? '#4b5263'
//         : '#282c34',
//     color:
//       state.isFocused && state.isSelected
//         ? 'rgb(235, 235, 235)'
//         : state.isSelected
//         ? 'rgb(30,30,30)'
//         : 'rgb(235, 235, 235)',
//   }),
// };

export const customStyles = {
  control: (base, state) => ({
    ...base,
    border: 'none',
    background: '#3e4452',
  }),
  placeholder: (base, state) => ({
    ...base,
    color: 'white',
    fontSize: '16px',
  }),
  singleValue: (base, state) => ({
    ...base,
    color: 'rgb(230,230,230)',
  }),
  multiValue: (base, state) => ({
    ...base,
    background: '#ffd54f',
    color: 'rgb(35,35,35)',
  }),
  multiValueLabel: (base, state) => ({
    ...base,
    color: 'rgb(35,35,35)',
  }),
  groupHeading: (base, state) => ({
    ...base,
    background: '#282c34',
    color: 'rgba(235, 235, 235, 0.7)',
  }),
  menu: (base, state) => ({
    ...base,
    background: '#282c34',
    color: 'rgb(235, 235, 235)',
  }),
  option: (base, state) => {
    return {
      ...base,
      background:
        state.isFocused && state.isSelected
          ? '#4b5263'
          : state.isSelected
          ? '#ffd54f'
          : state.isFocused
          ? '#4b5263'
          : '#282c34',
      color:
        state.isFocused && state.isSelected
          ? 'rgb(235, 235, 235)'
          : state.isSelected
          ? 'rgb(30,30,30)'
          : 'rgb(235, 235, 235)',
    };
  },
};
