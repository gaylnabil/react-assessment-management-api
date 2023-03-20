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
