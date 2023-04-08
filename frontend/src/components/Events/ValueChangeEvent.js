/**
 * Updates form data based on input value changes.
 *
 * @param {Object} event - The event object triggered by the input change.
 * @param {Function} setFormData - A function to update the form data state.
 * @returns {Object} An updated version of the previous form data state with new values from changed inputs.
 */
const onValueChange = (event, setFormData) => {
  setFormData((prevData) => {
    // const {name, type, value, checked} = event.target;
    const { name, type, value } = event.target;
    console.log([name], ":", type, ":", value);
    return {
      ...prevData,
      [name]:
        type === "number" || type === "select-one" ? Number(value) : value,
    };
  });
};

export default onValueChange;
