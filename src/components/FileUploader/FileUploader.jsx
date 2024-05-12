import React, { useEffect, useState } from 'react'
import styles from "./FileUploader.module.css";
import { MdOutlineFileUpload } from 'react-icons/md';
import Modal from '../../Modal';
import { FaEye } from 'react-icons/fa';


export default function FileUploader({ file = null, setFile }) {
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const handleFileChange = (event) => {
    let acceptedFiles = ["image/png", "image/jpeg", "application/pdf"]
    const selectedFile = event.target.files[0];
    console.log(selectedFile?.type);

    if (!(acceptedFiles.includes(selectedFile?.type))
    ) {
      setError("only PDF Accepted")
      setFile(null)
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const url = fileReader.result;
        setFile(url);
      };
      fileReader.readAsDataURL(selectedFile);
      setError(false)
      console.log(selectedFile);
    }

  };

  useEffect(() => {
    console.log(file);
  }, [file])
  return (
    <div className={`flex flex-col font-medium gap-1  capitalize`}>
      <label  >
        Investigation
      </label>
      <label htmlFor="investigation_files" className=' text-white cursor-pointer bg-gray-700 w-full flex justify-center items-center py-2 xl:w-1/2  rounded-lg'>
        <MdOutlineFileUpload /> Upload File
        <input onChange={handleFileChange} type="file" className='hidden' name="investigation_files" id="investigation_files" />
      </label>
      {error && <p className='text-sm font-extrabold text-red-600 py-1 xl:w-1/2  '>{error} *</p>}
      {
        file && <div className={'xl:w-1/2 w-full relative z-0 ' + styles.show} >
          <embed src={file} onClick={() => { console.log("hi"); }} type="application/pdf" className=' w-full ' />
          <div onClick={() => { setOpen(true) }} className={'absolute inset-0 bg-black flex justify-center bg-opacity-60 overflow-hidden cursor-pointer text-white h-0  transition-all items-center ' + styles.layer}>
            <FaEye size={"2rem"} />
          </div>
        </div>
      }
      {
        open && <Modal>
          <div className='w-full h-full flex justify-center items-center' onClick={() => { setOpen(false) }}>
            <iframe src={file} title='Data' type="application/pdf" className='  w-3/4 md:1/2 ' height={"80%"} />
          </div>
        </Modal>
      }
    </div>
  )
}
