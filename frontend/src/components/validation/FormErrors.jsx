import React from "react";

function FormErrors(props) {
  const errorElements = Object.entries(props.errors).map(
    ([ name, value ], index) => {
      return (
        <li key={index}>
          {name}: {value}
        </li>
      );
    }
  );

  return (
    <div>
      {Object.keys(props.errors).length > 0 && (
        <div className="alert alert-danger" role="alert">
          <ul>{errorElements}</ul>
        </div>
      )}
    </div>
  );
}

export default FormErrors;
