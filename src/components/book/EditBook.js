import React,{useState,useContext,useEffect} from 'react'
import PageTitle from '../layouts/PageTitle'
import {BookContext} from '../../contexts/BookContext'
import validate from "../../helpers/validation";
import {EDIT_BOOK} from '../../reducers/bookReducer'


function EditBook(props) {
    const {books,dispatch} = useContext(BookContext)
    const [formSubmit,setFormSubmit] = useState(false)
    const [book,setBook] = useState({
        id:'',
        name:'',
        description:'',
        author:'',
        genre:'',
        price:''
    })
    useEffect(()=>{
        const [incomingBook] = books.filter(book => book.id === props.match.params.id)
        setBook(incomingBook)
    },[books,props])


    const [errors,setErrors] = useState({
        name: {},
        description: {},
        author: {},
        genre: {},
        price: {}
    })

    const handleChange = (e)=>{
        setBook({
            ...book,
            [e.target.name]:e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const {name,description,author,genre,price} = book 
        const validateFields = {
            name:validate('Book Name', name,'required|min:2|max:150|string'),
            description:validate('Description',description,'min:5|max:300|string'),
            author:validate('Author Name',author,'min:2|max:150|string|required'),
            genre:validate('Genre',genre,'min:5|max:100|string|required'),
            price:validate('price',price,'min:1|max:10|number')
            
        }
        setErrors({ ...validateFields})
        setFormSubmit(true)
    }

    useEffect(()=>{
        if(formSubmit){
            for(let error in errors){
                if(errors[error].result===false){
                    setFormSubmit(false)
                    return
                }
                
            }
            dispatch({type:EDIT_BOOK,payload:book})
            setFormSubmit(false)
            props.history.push("/")
        }
        
    }, [formSubmit, dispatch, book, errors,props])
   
    return (
        <React.Fragment>
            <PageTitle  title={'Edit Book'}/>
            <div className="card">
                <div className="card-header">
                    <h4 className="font-weight-light">Fill up the form with proper informations</h4>
                </div>
                <div className="card-body">
                    <p className="text-info">All required fields have a red star in their label. Without those data, form will not be submitted for further processing. This form only supports English and bengali alphabets</p>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Book Name: <span className="text-danger font-italic">* {(errors.name.result===false)?errors.name.message:''}</span> </label>
                            <input 
                            type="text" 
                            name="name" 
                            className={(errors.name.result===false)?"form-control is-invalid":"form-control"}
                            value={book.name}
                            onChange={handleChange}
                            placeholder="Enter Book Name"
                            
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description: <span className="text-danger font-italic"> {(errors.description.result === false) ? errors.description.message : ''}</span></label>
                            <textarea 
                            name="description" 
                            className={(errors.description.result === false) ? "form-control is-invalid" : "form-control"}
                            value={book.description}
                            onChange={handleChange}
                            placeholder="Enter proper description within 50 words"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author: <span className="text-danger font-italic">* {(errors.author.result === false) ? errors.author.message : ''}</span> </label>
                            <input
                                type="text"
                                name="author"
                                className={(errors.author.result === false) ? "form-control is-invalid" : "form-control"}
                                value={book.author}
                                onChange={handleChange}
                                placeholder="Enter Author Name"
                                
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre">Genre: <span className="text-danger font-italic">* {(errors.genre.result === false) ? errors.genre.message : ''}</span> </label>
                            <select
                                name="genre"
                                className={(errors.genre.result === false) ? "form-control is-invalid" : "form-control"}
                                value={book.genre}
                                onChange={handleChange}
                                placeholder="Which genre?"
                            >
                                <option value="" disabled>--Choose a Genre--</option>
                                <option value="Novel">Novel</option>
                                <option value="Biography">Biography</option>
                                <option value="Poem">Poem</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price: <span className="text-danger font-italic">{(errors.price.result === false) ? errors.price.message : ''}</span></label>
                            <input
                                type="text"
                                name="price"
                                className={(errors.price.result === false) ? "form-control is-invalid" : "form-control"}
                                value={book.price}
                                onChange={handleChange}
                                placeholder="Enter price if possible"
                            />
                        </div>
                        <div className="form-group"><button className="btn btn-primary">Update Book</button></div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditBook