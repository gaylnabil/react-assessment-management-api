const validate = (fields) => {
  const errors = {};
  // console.log("fields: ", fields);

  for (const [name, value] of Object.entries(fields)) {
    // console.log("name:", name, ", value:", value);
    switch (name) {
      case "name":
        if (!value) errors.ErrorWholesaler = "The wholesaler cannot be empty.";
        break;
      case "clientName":
        if (!value) errors.ErrorValue = "The order cannot be empty.";
        break;
      case "quantity":
        if (value === 0) errors.ErrorQuantity = "The Quantity cannot be Zero.";
        break;
      case "beerId":
        if (value === 0) errors.ErrorBeer = "The Beer must exist.";
        break;
      case "wholesalerId":
        if (!value) errors.ErrorWholesaler = "The wholesaler must select one.";
        break;
      case "quantityRest":
        if (value < 0)
          errors.quantityRest =
            "The number of beers ordered cannot be greater than the wholesaler's stock.";
        break;
      default:
        break;
    }
  }
  return errors;
};

export { validate };
