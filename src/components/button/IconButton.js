import React from "react";

export default function IconButton({toggle,children}) {
    return (
        <button className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center" onClick={toggle}>
            {children}
        </button>
    )
}