import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Loading from './Components/Loading.js'
import useDataHandler from './Components/useDataHandler.js'

const Header = React.lazy(() => import('./Components/Header.js'))
const Cards = React.lazy(() => import('./Components/CardRepresentation.js'))
const Tree = React.lazy(() => import('./Components/TreeRepresentation.js'))
const Footer = React.lazy(() => import('./Components/Footer.js'))
const TreeHeader = React.lazy(() => import('./Components/TreeHeader.js'))
const e404 = React.lazy(() => import('./Components/Page404.js'))

const Routes = () => {
    const {
        items, 
        closedItems, 
        closeItem, 
        restoreItem, 
        setOpened, 
        opened, 
        sort, 
        sortedOpened, 
        sortedClosed, 
        reset, 
        loading
    } = useDataHandler()

    if (loading) {return <Loading/>} else
    return (
    <React.Suspense fallback = {<Loading/>}>
        <Router>
            <Switch>
                <Route exact path = "/">
                    <Redirect to = "/cards/1"/>
                </Route>
                <Route exact path = "/cards/">
                    <Redirect to = "/cards/1"/>
                </Route>
                <Route exact path = "/cards/:page">
                    <Header 
                        opened = {opened} 
                        setOpened = {setOpened} 
                        sort = {sort}
                        sortedOpened = {sortedOpened}
                        sortedClosed = {sortedClosed}
                        reset = {reset}
                    />
                    <Cards 
                        items = {items} 
                        closedItems = {closedItems} 
                        closeItem = {closeItem} 
                        restoreItem = {restoreItem}
                        opened = {opened}
                    />
                    
                </Route>
                <Route exact path = "/tree">
                    <TreeHeader/>
                    <Tree
                        items = {items}
                    />
                </Route>
                <Route path = "*" component = {e404}/>
            </Switch>
            <Footer/>
        </Router>
    </React.Suspense>
    )
}

export default Routes