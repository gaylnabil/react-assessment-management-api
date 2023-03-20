import React from 'react'

function SelectTag(props) {

    const optionsElement = props.list && props.list.map((obj) => (
        <option key={obj.id} value={obj.id} >{obj.name}</option>
    ));
    return (
        <>
            <select
                required={props.required}
                value={props.value}
                name={props.name}
                id={props.id}
                className="form-select"
                aria-label={props.label}
                onChange={props.onChange}
                onBlur={props.onBlur}
            >
                <option value="0">{props.defaultValue}</option>
                {optionsElement}
            </select>
        </>
    )
}

export default SelectTag
