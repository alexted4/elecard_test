import {useState, useEffect} from 'react'
import Loading from './Loading'
import API from '../api.js'

const useDataHandler = () => {
    const [items, setItems] = useState([])
    const [closedItems, setClosedItems] = useState([])
    const [opened, setOpened] = useState(true)
    const [sortedOpened, setSortedOpened] = useState('category')
    const [sortedClosed, setSortedClosed] = useState('category')
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        const link = API + `catalog.json`
        const res = await fetch(link)
        const data = await res.json()
        getNames(data)
    }
    
    const getNames = (data) => {
        let arr = []
        for (var i = 0; i < data.length; i++){
            let name = parseName(data[i].image)
            data[i].name = name
            let obj = data[i]
            arr.push(obj)
        }
        setItems(arr)
        setLoading(false)
    }

    const parseName = (str) => {
        return str.slice(str.lastIndexOf('/') + 1, str.length)  
    }

    const sort = (by) => {
        setLoading(true)
        let array = []
        opened ? array = items : array = closedItems
        let newArray = [] 
        newArray = array.sort(function (a, b) {
            switch (by) {
                case 'category' : return a.category.localeCompare(b.category)
                case 'date' : return a.timestamp - b.timestamp
                case 'name' : return a.name.localeCompare(b.name)
                case 'size' : return a.filesize - b.filesize
                default : return a.category - b.category
            }
          })
          opened ? setItems(newArray) : setClosedItems(newArray)
          opened ? setSortedOpened(by) : setSortedClosed(by)
          setLoading(false)
    }

    const closeItem = (i) => {
        if (items.length > 0){
            let item =  items.find( el => el.name === i)
            let closedArray = closedItems
            item && closedArray.push(item) 
            setClosedItems(closedArray)
            let openedArray = items.filter( el => el.name !== i)
            setItems(openedArray) 
        }
    }

    const restoreItem = (i) => {
        if (closedItems.length > 0){
            let item = closedItems.find( el => el.name === i)
            let openedArray = items
            item && openedArray.push(item)
            setItems(openedArray)
            let closedArray = closedItems.filter( el => el.name !== i)
            setClosedItems(closedArray)
        }
    }

    const reset = () => {
        setLoading(true)
        setItems([])
        setClosedItems([])
        setSortedClosed()
        setSortedOpened()
        setOpened(true)
        setReload(!reload)
    }

    useEffect(()=>{
        fetchData()
    }, [reload])

    useEffect(()=>{
        if (items[0] || closedItems[0]){
            opened ? sort(sortedOpened) : sort(sortedClosed)
        }
    }, [opened])

    if (loading) {return <Loading/>} else
    return {
        items, 
        closedItems, 
        closeItem, 
        restoreItem, 
        setOpened, 
        opened, 
        sort, 
        sortedOpened, 
        sortedClosed, 
        reset
    }
}

export default useDataHandler

