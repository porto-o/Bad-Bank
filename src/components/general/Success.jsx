// make a succes modal with bootstrap that receives a message as a prop
// also a show property to show or not
// dissapear after 3 seconds
const Success = ({ show, message }) => {
    return (
        <div
            className={`modal ${show ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: show ? "block" : "none" }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="success">
                            <div className="alert alert-success" role="alert">
                                {message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Success;