import React from 'react'

function SelectTag(props) {

    const optionsElement = props.list.map((obj) => (
        <option key={obj.id} value={obj.id} >{obj.name}</option>
    ));
    return (
        <>
            <select
                {...props.register}
                id={props.id}
                aria-label={props.label}
                className="form-select"
            >
                <option value="">{props.defaultValue}</option>
                {optionsElement}
            </select>
        </>
    )
}

export default SelectTag
