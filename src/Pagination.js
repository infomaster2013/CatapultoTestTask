import React, {useEffect, useMemo, useState} from 'react';

export default function Pagination({currentPage,onPageChange,itemsPerPage,total}) {

    const [totalPages,setTotalPages] = useState(0)

    useEffect(()=>{
        if(total > 0 && itemsPerPage > 0){
            setTotalPages(Math.ceil(total / itemsPerPage))
        }
    },[total,itemsPerPage])

    const paginationItems = useMemo(()=>{
            const pages = [];
            for(let i = 1; i <= totalPages; i++){
                pages.push(
                    <button
                        key={i}
                        active={i === currentPage.toString()}
                        onClick={()=>onPageChange(i)}
                    >{i}</button>
                )
            }
            return pages;
    },[totalPages,currentPage])

    if( totalPages === 0 ) return null

    return (
        <div>
            <button
                onClick={()=> onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >Предыдущая</button>
            {paginationItems}
            {/*<button>1</button>*/}
            {/*<button>2</button>*/}
            {/*<button>3</button>*/}
            {/*<button>4</button>*/}
            {/*<button>5</button>*/}
            {/*<button>6</button>*/}
            <button
                onClick={()=> onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >Следующая</button>
        </div>
    )
}