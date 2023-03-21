import React from 'react'

function SelectTag(props) {

    // console.log('====================================');
    // console.log("Select Tag: ", props.list.length !== 0);
    // console.log('====================================');
    const optionsElement = props.list.map((obj) => (
        <option key={obj.id} value={obj.id} >{obj.name}</option>
    ));
    return (
        <>
            <select
                id={props.id}
                name={props.name}
                aria-label={props.label}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                required={props.required}
                className="form-select"
            >
                <option value="0">{props.defaultValue}</option>
                {optionsElement}
            </select>
        </>
    )
}

export default SelectTag
