import React from 'react'
import {Container, Row, Col, ListGroup, Button, Image} from 'react-bootstrap'
import {useRef} from 'react'
import {parseSize, parseDate} from '../parser'
import Loading from './Loading'
import API from '../api.js'

const TreeRepresentation = ({items}) => {
    var refs = useRef([React.createRef(), React.createRef()]);
    var hashmap = new Map()
    var categories = []

    const pullDistinctCategories = () => {
        let arr = []
        items.map(el => {
            if (!arr.find(el2 => el2 === el.category)) {
                arr.push(el.category) 
            }
        })
        return arr
    }

    const buildHashmap = () => {
        let arr = []
        categories = pullDistinctCategories() 
        categories.map(el => {
            arr = items.filter( el2 => el2.category === el)
            hashmap.set(el, arr)
        }) 
    }

    const handleClick = (i) => {
        refs.current[i].current.hidden = !refs.current[i].current.hidden
    }

    const buildLayout = () => {
        buildHashmap()
        let l = []
        hashmap.forEach((value, key) => {
            refs.current[key] = refs.current[key] || React.createRef()
            l.push(
                <ListGroup as="ul" key = {key}>
                    <ListGroup.Item>
                        <Button variant = "light" size="lg" block onClick={() => handleClick(key)} style = {{textTransform: "capitalize"}}>{key}</Button>
                        <div  ref = {refs.current[key]} hidden={true}>
                        {value.map(el => {
                            return(     
                                <ListGroup as="ul">
                                    <ListGroup.Item>
                                        <Container fluid>
                                                <Row>
                                                    <Col>
                                                        <a href={API +  el.image}><Image style = {{maxHeight: "30px"}} responsive="true" fluid src={API +  el.image}/></a>
                                                    </Col>
                                                    <Col>
                                                        {el.name}
                                                    </Col>
                                                    <Col>
                                                        {parseDate(el.timestamp)}
                                                    </Col>
                                                    <Col>
                                                        {parseSize(el.filesize)}
                                                    </Col>
                                                </Row>
                                        </Container>
                                    </ListGroup.Item>
                                </ListGroup>
                                
                            )
                        })}
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            )
        })
        return l
    }

    return (
        <Container fluid className="representation">
            {items ? buildLayout() : <Loading/>}
        </Container>
    )
}

export default TreeRepresentation
