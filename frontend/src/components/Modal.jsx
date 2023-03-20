import React from 'react'

function Modal(props) {
    return (
        <div>
            {/* <!-- Modal --> */}
            <div className="modal fade"
                id={props.staticBackdrop}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Brewery {props.id}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            are you sure you want to delete this Beer?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary px-5" data-bs-dismiss="modal">No</button>
                            <button
                                type="button"
                                className="btn btn-primary px-5"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    props.deleteBeer(props.id);
                                }}
                            >Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
