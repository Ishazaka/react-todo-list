import React, { useEffect, useState } from 'react';
import "./style.css";

const getlocaldata = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputdata, setInputdata] = useState("");
    const [items, setItems] = useState(getlocaldata());
    const [isedit, setIsedit] = useState("");
    const [togglebtn, setTogglebtn] = useState(false);

    // add item function
    const addItem = () => {
        if (!inputdata) {
            alert("please add any note")
        } else if (inputdata && togglebtn) {
            setItems(
                items.map((curelem) => {
                    if (curelem.id === isedit) {
                        return { ...curelem, name: inputdata }
                    }
                    return curelem;
                })
            )
            setIsedit("");
            setInputdata("");
            setTogglebtn(false);
        } else {
            const mynewinputdata = {
                id: new Date().getTime().toString(),
                name: inputdata

            }

            setItems([...items, mynewinputdata]);
            setInputdata("");
        }
    }

    //  delete item section
    const deleteItem = (index) => {
        const updatedata = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedata);
    };

    // remove all data
    const RemoveAll = () => {
        setItems([]);
    };

    //    adding in local storage  
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items]);

    // editing data here
    const editItem = (index) => {
        const item_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputdata(item_edited.name);
        setIsedit(index);
        setTogglebtn(true);
    }


    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍ Add Item' className='form-control' value={inputdata} onChange={(event) => setInputdata(event.target.value)} />
                        {togglebtn ? (<i className='fa fa-edit add-btn' onClick={addItem}></i>) : (
                            <i className='fa fa-plus add-btn' onClick={addItem}></i>
                        )};


                    </div>

                    {/* show our items */}
                    <div className='showItems'>
                        {items.map((curElem) => {
                            return (
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className='far fa-edit add-btn' onClick={() => editItem(curElem.id)}></i>
                                        <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>


                            );
                        })}
                    </div>


                    {/* remove all button div */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={RemoveAll} >
                            <span>CHECK LIST</span>
                        </button>
                    </div>

                </div>

            </div>


        </>
    )
}

export default Todo;