import {Container,  Row, Col, Spinner} from 'react-bootstrap'

const Loading = () => {
    return (
        <Container>
                <Row>
                    <Col className="align-spinner" xs = {{span: 6, offset:6}} >
                        <Spinner animation="border" variant="primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
        </Container>
    )
}

export default Loading
