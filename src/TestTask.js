import React, {useEffect, useMemo, useState} from 'react';
import Pagination from './Pagination'

export default function TestTask({data}) {

    const arrayOfOptions = [
        {
            id: 1,
            value: "Бренд"
        },
        {
            id: 2,
            value:"Tefal"
        },
        {
            id: 3,
            value:"КМЗ"
        },
        {
            id: 4,
            value:"Tescoma"
        },
        {
            id: 5,
            value:"Красный коммунар"
        }

    ]

    const [comments,setComments]=useState([]);
    const [totalItems,setTotalItems]=useState(0);
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(4);
    const [search,setSearch]=useState('');
    const [options,setOptions]=useState(arrayOfOptions)
    const [selectedOption,setSelectedOption]=useState('');

    useEffect(()=>{
        // const getData = ()=>{
        //     fetch('https://jsonplaceholder.typicode.com/comments')
        //         .then(response => response.json())
        //         .then(json => setComments(json))
        // }
        setComments([...comments,...data])


    },[])

    const commentsData = useMemo(()=>{
        let computedComments = comments;

        // Поиск
        // if(search){
        //     computedComments = computedComments.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
        //
        // }

        // Select
           if(selectedOption !== 'Бренд'){
               computedComments = computedComments.filter(item=>item.brand.toLowerCase().includes(selectedOption.toLowerCase()))
           }

        setTotalItems(computedComments.length)
        // Current page Slice
        return computedComments.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        )
    },[comments,currentPage,search,selectedOption])

    return (
        <div className='testTask'>
            <section>


                <table className="productTable">
                    <thead className="productTable__thead">

               <tr><th>Артикул</th>
                   <th className='productTable__tr'>Наименование</th>
                   <th className='productTable__tr'>Брэнд</th>
                   <th className='productTable__tr'>Вес</th>
                   <th className='productTable__tr'>Фасовка</th>
                   <th className='productTable__tr'>Цена</th>
                   <th className='productTable__tr'>В наличии</th></tr>
                    </thead>
                    <tbody>
                    {
                        commentsData.map(comment=> (<tr className='table__tr' key={comment.artnumber}>
                                <td className='productTable__cell'>{comment.artnumber}</td>
                                <td className='productTable__cell'>{comment.name}</td>
                                <td className='productTable__cell'>{comment.brand}</td>
                                <td className='productTable__cell'>{comment.weight}</td>
                                <td className='productTable__cell'>{comment.quantity}</td>
                                <td className='productTable__cell'>{comment.price}</td>
                                <td className='productTable__cell'><input type="checkbox" checked={comment.stock} /></td>
                            </tr>)
                        )
                    }

                    </tbody>
                </table>
                <Pagination
                    total={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={ page=> setCurrentPage(page)}
                />
            </section>
            <aside className="aside">
                <select
                    value={selectedOption}
                    onChange={(e)=> {
                        setSelectedOption(e.target.value)
                        setCurrentPage(1);
                    }}
                >{
                    options.map(option=> (
                        <option key={option.id}>{option.value}</option>
                    ))
                }

                </select>

                <button onClick={()=>{
                    setSelectedOption('Бренд');
                    setOptions([...arrayOfOptions,arrayOfOptions[0].selected = true])
                    console.log(arrayOfOptions)
                }}>Сбросить фильтр</button>
                <span data-testid="total">Товаров: {totalItems}</span>

            </aside>


        </div>
    )
}