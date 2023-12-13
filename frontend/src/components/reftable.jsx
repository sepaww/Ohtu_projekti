/* eslint-disable react/prop-types */
import { Table, Button, Badge, Container} from "react-bootstrap"
import { useState } from "react"
import Toolbar from "./toolbar"
import DeleteModal from "./delete"

function yearLimits (references)  {
    const values = references.flatMap((o) => o.year.match(/\d+/g)).filter(v => v)
    return {min: Math.min(...values), max: Math.max(...values)}
}

function filterCriterion(filters, ref) {
    const years = ref.year.match(/\d+/g)
    // at least one of the end points in year must fall within filter range
    if (years && !years.some(y => y >= filters.year.min && y <= filters.year.max )) {
        return false
    }

    const refWAll = {...ref, all: Object.values(ref).toString()}

    return Object.keys(refWAll).every(key => {
        if (filters.text[key]) {
            const regex = new RegExp(filters.text[key], 'i')
            return regex.test(refWAll[key])
        }
        return true
    })
}

function RefRow({ reference, headers, setToBeDeleted }) {
    return (
        <tr key={reference.citekey}>
            {headers.map(k => k === "citekey" ? 
                <td key={k}><Badge bg="secondary" className="p-2">{reference[k]}</Badge></td> :
                <td key={k}>{reference[k]}</td>)}
            <td> 
                <Button variant="danger" size="sm" onClick={() => setToBeDeleted(reference.citekey)}>
                    Delete
                </Button>
            </td>
        </tr>
    )
}

export default function Reftable ({refs, setRefs, setAlert}) {
    const [prevLimits, setPrevLimits] = useState({min: -Infinity, max: Infinity})
    const [filters, setFilters] = useState({
        year: yearLimits(refs),
        text: {
            all: "",
            author: "",
            title: ""
        }
    })
    const [toBeDeleted, setToBeDeleted] = useState("")

    const limits = yearLimits(refs)
    if (JSON.stringify(limits) !== JSON.stringify(prevLimits)) {
        setFilters({...filters, year: limits})
        setPrevLimits(limits)
    }

    const headers = {article: ["author", "journal", "title", "year", "citekey"],
                     book: ["author", "publisher", "title", "year", "citekey"],
                     inproceedings: ["author", "booktitle", "title", "year", "citekey"]}

    const TableEntry = ({headers, type}) => {
        const refstodisplay = refs.filter((r) => r.type === type)
        if (refstodisplay.length === 0) return 
        return(
        <Container className="border py-2 my-2 rounded"> 
            <h5> {type} </h5>
            <Table striped id={type + 'list'}> 
                <thead> 
                    <tr>
                        {headers.map((r) => <th key={r}>{r}</th>)}
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {refstodisplay.filter(r => filterCriterion(filters, r)).map((reference) => 
                    <RefRow key={reference.citekey} reference={reference} setToBeDeleted={setToBeDeleted} headers={headers}/>
                    )}                    
                </tbody>
            </Table>
            <DeleteModal toBeDeleted={toBeDeleted} setToBeDeleted={setToBeDeleted} refs={refs} setRefs={setRefs} setAlert={setAlert}/>
        </Container>
        )
    }

    return (
    <div> 
      <Toolbar filters={filters} setFilters={setFilters} limits={limits}/>  
          {Object.keys(headers).map((type => 
            <TableEntry key={type} headers={headers[type]} type={type}/>))}
    </div>
    
    )

}