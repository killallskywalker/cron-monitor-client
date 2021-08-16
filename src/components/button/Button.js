export default function Button({title,onClick,type}) {

    let color = (type === 'success') ? 'green' : 'red';
    
    return (
        <button type="submit" className={`bg-${color}-600 w-full p-2 rounded-md text-white font-semibold hover:bg-${color}-700`} onClick={onClick}> 
           {title}
        </button>
    )
}