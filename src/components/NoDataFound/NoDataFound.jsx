import React from 'react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdAdd } from "react-icons/md";

export default function NoDataFound({ title = "data", link = "" }) {
    const { user } = useSelector(state => state.auth)

    return (
        <div className='  flex capitalize justify-center items-center flex-col gap-3 min-h-96 '>
            <AiOutlineFileSearch className='md:size-56 size-40   text-fuchsia-800 text-opacity-60 ' />
            <h2 className=' md:text-xl lg:text-2xl font-semibold text-fuchsia-800 '>No {title} Found</h2>
            {(user?.role === "doctor" || user?.role === "admin") && <Link className='px-7 flex gap-3  py-2 bg-fuchsia-800 text-white rounded-xl' to={`/patient/${link}/add`}>
                <MdAdd size={"1.5rem"} />
                Add {title} </Link>}
        </div>
    )
}
