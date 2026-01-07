

function TableElement(props){
    return(
        <div>
            {props.loginID}, {props.name}, {props.age} 
            <button onClick={()=>{return props.handleUpdate(props.loginID)}}>Update</button>
            <button onClick={()=>{return props.handleDelete(props.loginID)}}>Delete</button>
        </div>
    )
}

export default TableElement;