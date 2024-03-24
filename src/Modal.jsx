import React from 'react'
import ReactDOM from 'react-dom';


const Overlay = ({ children }) => {
    return <div className='fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center'>{children}</div>
}
export default function Modal({ children }) {
    return (
        ReactDOM.createPortal(<Overlay>
            {children}
        </Overlay>, document.getElementById("modal"))
    )
}


