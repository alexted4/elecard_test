import {Navbar, Nav, Dropdown, Form, Button} from 'react-bootstrap'
import {BiSortDown} from 'react-icons/bi'

const Header = ({setOpened, opened, sort, sortedOpened, sortedClosed, reset}) => {

    const handleChange = (action) => {
        sort(action)
    }

    const handleReset = () => {
        reset()
    }

    const getRadio = () => {
        if (opened) {return sortedOpened} else {return sortedClosed}
    }

    const getContent = () => {
        return(
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link className={opened && "active"} onClick={()=> setOpened(true)}>Opened Elements</Nav.Link>
                        <Nav.Link className={!opened && "active"} onClick={()=> setOpened(false)}>Closed Elements</Nav.Link>
                    </Nav>
                    <Nav>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" style={{marginRight:"10px"}}>
                                <BiSortDown size="1.5em"/> Sort by...
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <Dropdown.Item onSelect={() => handleChange('category')}>
                                    <input 
                                        type="radio"
                                        variant="dark" 
                                        checked={(getRadio() === 'category') ? true : false} 
                                        disabled
                                    /> Category
                                </Dropdown.Item>
                                <Dropdown.Item onSelect={() => handleChange('date')}>
                                    <input 
                                        type="radio" 
                                        checked={(getRadio() === 'date') ? true : false}
                                        disabled
                                    /> Date
                                </Dropdown.Item>
                                <Dropdown.Item onSelect={() => handleChange('name')}>
                                    <input 
                                        type="radio" 
                                        checked={(getRadio() === 'name') ? true : false}
                                        disabled
                                    /> Name
                                </Dropdown.Item>
                                <Dropdown.Item onSelect={() => handleChange('size')}>
                                    <input
                                        type="radio" 
                                        checked={(getRadio() === 'size') ? true : false}
                                        disabled
                                    /> File Size                              
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    <Form inline>
                    <Button variant="secondary" onClick={() => handleReset()}>Reset</Button>
                    </Form>
                </Navbar.Collapse>
        )
    }
    
    return (
            <Navbar bg="info" variant="dark" expand="lg" className="fixed-top">
                <Navbar.Brand>Elecard Test</Navbar.Brand>
                <Navbar.Toggle/>
                {getContent()} 
            </Navbar>
    )
}

export default Header
