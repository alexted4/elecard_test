import React from 'react'
import {Container, Row, Col, Pagination, FormControl} from 'react-bootstrap'
import OneCard from './OneCard.js'
import Loading from './Loading.js'
import {useState, useEffect, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'

const CardRepresentation = ({items, closedItems, closeItem, restoreItem, opened}) => { 
    const params = useParams()
    const history = useHistory()
    const [currentPage, setCurrentPage] = useState(params.page) 
    const ref = useRef()

    const elPerRow = 4
    const rowsPerPage = 4

    const getRow = (row, array) => {
        let arr = []
        for (let i = elPerRow*row; i < elPerRow*row + elPerRow; i++){
            let el = <Col md = {3} key = {i}>
                <OneCard 
                    element = {array[i]} 
                    closeItem = {closeItem} 
                    opened = {opened} 
                    restoreItem = {restoreItem}
                />
            </Col>
            arr.push(el)
        }
        return arr
    }

    const listCards = (array) => {
        let arr = []
        for (let j = currentPage*rowsPerPage-rowsPerPage; j < currentPage*rowsPerPage; j++){
            let r = <Row key = {j}>{getRow(j, array)}</Row>
            arr.push(r)
        }
        return arr
    }

    const getCards = () =>{
        if (items && closedItems){
            if (opened){
                if (items[0]) {return listCards(items)} else {return "No opened elements to display"}
            } else if (closedItems[0]) {return listCards(closedItems)} else {return "No closed elements to display"}
        } else return <Loading/>
    }

    const changePage = (to) => {
        if (to < 1 || to > items.length/elPerRow/rowsPerPage + 1) {} else {
        history.push(to.toString())
        }
    }

    const handleInput = () => {
        setCurrentPage(ref.current.value)
    }

    const handleLast = () =>{
        opened ? changePage(Math.floor(items.length/elPerRow/rowsPerPage + 1)) : changePage(Math.floor(closedItems.length/elPerRow/rowsPerPage + 1))
    }
    
    const getPagination = () => {
         return(
            <Pagination>
                <Pagination.First onClick = {()=> changePage('1')}/>
                <Pagination.Prev onClick = {()=> changePage(parseInt(currentPage)-1)}/>
                <FormControl ref = {ref} style={{maxWidth: "50px"}} value={currentPage} onChange={()=> handleInput()}/>
                <Pagination.Next onClick = {()=> changePage(parseInt(currentPage)+1)}/>
                <Pagination.Last onClick = {()=> handleLast()}/>
            </Pagination>
        )
    }

    useEffect(()=>{
        setCurrentPage(params.page)
    }, [params])

    useEffect(()=>{
        (currentPage != '1') && history.push('1')
    },[opened])

    return (
        <Container fluid className="representation">
            <Row><Col>{getPagination()}</Col></Row>
            {items ? getCards() : <Loading/>}
        </Container>
    )

}

export default CardRepresentation
