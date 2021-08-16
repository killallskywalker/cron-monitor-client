
import React  from "react";

export default function ProjectModal({isOpen , toggle , children}){

    if(isOpen){
        return(
            <div className={isOpen ? null : "hidden"}>
                <div className="fixed flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-gray-900 opacity-95">
                    <div className="rounded-md bg-white w-1/2 p-4 text-center space-y-3 font-bold">
                        {children}
                        <button className="bg-red-600 w-full p-2 rounded-md text-white font-semibold hover:bg-red-700" onClick={toggle}> 
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
    return null;
}