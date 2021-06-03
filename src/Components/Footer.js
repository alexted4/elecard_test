import {Container, Row, Col, Button} from 'react-bootstrap'
import {useState, useEffect, useRef} from 'react'
import {ImTree} from 'react-icons/im'
import {BsCardImage} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function Footer() {
    const [card, setCard] = useState(true)
    const [tree, setTree] = useState(false)
    const footerRef = useRef()

    const toggleActive = () => {
        setCard(!card)
        setTree(!tree)
    }

    useEffect(()=>{
        if (window.location.pathname  === "/cards") {
            setCard(true)
            setTree(false)
        } else if (window.location.pathname  === "/tree") {
            setCard(false)
            setTree(true)
        } else {
            footerRef.current.style.display = "none"
        }
    }, [])
    return (
        <Container className = "footer fixed-bottom" fluid ref = {footerRef}>
            <Row>
                <Col xs = {6}>
                    <Link to = "/cards">
                    <Button variant="info" size="lg" block className = {card && 'active'} onClick={()=> toggleActive()}>
                        <BsCardImage size="1.2em"/> Cards
                    </Button>
                    </Link> 
                </Col>
                <Col xs = {6}>
                    <Link to = "/tree">                       
                    <Button variant="info" size="lg" block className = {tree && 'active'} onClick={()=> toggleActive()}>
                        <ImTree size="1.2em"/> Tree
                    </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer