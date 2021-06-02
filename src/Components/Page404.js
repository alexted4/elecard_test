import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'

const Page404 = () => {
    return (
        <Container className="representation text-center">
            <h1>Error 404 - Not Found</h1>
            <Link to = "/">Return to home page</Link>
        </Container>
    )
}

export default Page404
