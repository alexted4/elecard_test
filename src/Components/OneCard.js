import {Card, Image, Button} from 'react-bootstrap'
import {CgCloseR} from 'react-icons/cg'
import {FaRegPlusSquare} from 'react-icons/fa'
import {parseSize, parseDate} from '../parser'
import API from '../api.js'

const OneCard = ({element, closeItem, opened, restoreItem}) => {
    const getButton = (isClose) => {
        return (
            <Button
                    style={{padding:0}} 
                    variant="secondary-outline" 
                    className="float-right"
                    onClick={()=> handleButton(isClose)}
                    >
                    {isClose ? <CgCloseR size="1.5em"/> : <FaRegPlusSquare size="1.5em"/>}
            </Button>
        )
    }
    const handleButton = (isClose) => {
        isClose ? closeItem(element.filesize) : restoreItem(element.filesize)
    }

    
    
    if (element){
    return (
        <Card bg = "light" className="mb-2" text = "dark">
            <Card.Header>
                {opened ? getButton(true) : getButton(false)}
                <span>{element.name}</span>
            </Card.Header>
            <Card.Body style={{padding:0}}>
                <Image className="image-style" responsive="true" fluid src={API+element.image}/>
            </Card.Body>
            <Card.Footer>
                <p style = {{textTransform: "capitalize"}}>{element.category}</p>
                <p>
                    <span>{parseDate(element.timestamp)}</span>
                    <span className="float-right">{parseSize(element.filesize)}</span>
                </p>
            </Card.Footer>
        </Card>
    )} else return null
}

export default OneCard
