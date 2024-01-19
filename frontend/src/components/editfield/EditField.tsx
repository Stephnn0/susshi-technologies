import EditIcon from '@mui/icons-material/Edit';
import "./edit-field.css"
import { FC, useState } from 'react';

interface EditFieldProps {
    main: string;
    field: string;

  }

const EditField: FC<EditFieldProps>  = ({
    main,
    field,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
   };
    

  return (
    <>
    {
        isOpen ?
         <div className="edit-fields-div">
           <input placeholder={main}/>
           <div className='pop-up-update-profile'>
            <span onClick={toggleDropdown}>cancel</span>
            <span>Update</span>
           </div>
         </div>
         :

         <div className="edit-fields-div">
         <div className="edit-fields-div-inside">
          <span>{main}</span>
           <div>
            <span 
               className='hovverble-edit'
               onClick={toggleDropdown} 
               style={{cursor: "pointer", color: "rgb(24, 114, 187)"}}>Edit</span>
            <EditIcon style={{color: "gray", height: "15px"}}/>
          </div>
        </div>
        <span>{field}</span>
       </div>

    }

    </>

  )
}

export default EditField