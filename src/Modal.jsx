
import React from 'react'
import ReactDOM from 'react-dom';


const Overlay = ({ children }) => {
    return <div className='fixed inset-y-0 end-0 z-30 bg-opacity-50    md:w-8/12   2xl:w-5/6 lg:w-9/12 w-full bg-black flex justify-center items-center'>{children}</div>
}
export default function Modal({ children }) {
    return (
        ReactDOM.createPortal(<Overlay>
            {children}
        </Overlay>, document.getElementById("modal"))
    )
}


