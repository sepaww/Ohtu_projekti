/* eslint-disable react/prop-types */
import { Table, Button, Badge, Container} from "react-bootstrap"
import refservice from "../Services/Refservice"
import { useEffect, useState } from "react"
import Toolbar from "./toolbar"

const refFilter = (refs, filter) => {
    const copyrefs = [...refs]
    var newrefs = copyrefs.filter((r) => r.year >= filter.year.min && r.year <= filter.year.max)
    if (Object.entries(filter.criterias).length > 0) {
        const field = Object.entries(filter.criterias)[0][0]
        const string = Object.entries(filter.criterias)[0][1]
        const regex = new RegExp(string, 'i')
        switch(field) {
            case 'All'  : 
                newrefs = newrefs.filter(r => {
                    const valuesastring = Object.values(r).toString()
                    console.log(valuesastring)
                    return regex.test(valuesastring)
                })
                break
            case 'Author'  : 
                newrefs = newrefs.filter(r => regex.test(r.author))
                break
            case 'Title' :
                newrefs = newrefs.filter(r => regex.test(r.title))
                break
        }   
    }
    return newrefs
}
const Reftable = ({refs, setRefs}) => {
    const [yearRange, setYearRange] = useState(countLimits(refs)) 
    const [filter, setFilters] = useState({criterias: {}, year: yearRange})
    const [refsToDisplay, setRefsToDisplay] = useState(null)
    const [limits, setLimits ] = useState(yearRange)
    
    const handledelete = deletefunc(refs, setRefs, setYearRange)
    
    useEffect(()=> {
        const newrefs = refFilter(refs, filter)
        setRefsToDisplay(newrefs)
    }, [filter, refs])

    useEffect(() => {
        const newyears = countLimits(refs)
        setYearRange(newyears)
        setLimits(newyears)
        
    }, [refs])

    if (!refsToDisplay) return( <h3> waiting</h3>)
    const Delbutton = (citekey) => {
        return (
            <Button variant="danger" size="sm" onClick={() => handledelete(citekey)}> Delete </Button>
        )
    } 
    const rows2 = ["author", "journal", "title", "year",]

    return (
        <Container> 
            <Toolbar filter={filter} setFilters={setFilters} yearRange={yearRange} setLimits={setLimits} limits={limits}>  </Toolbar>
            <Table striped id="entrylist"> 
                <thead> 
                    <tr>
                        {rows2.map((r) => <th key={r}>{r}</th>)}
                        <th> Delete</th>
                        <th> Citekey</th>
                    </tr>
                </thead>
                <tbody> 
                    {refsToDisplay.map((ref) => 
                        <tr key={ref.citekey}> 
                    {       rows2.map((r)=> 
                        <th key={ref[r]}> {ref[r]} </th> )} 
                        <th> 
                            <Delbutton reference={ref.citekey}/> 
                        </th>
                        <th> 
                            <Badge bg="secondary" className="p-2"> {ref.citekey}</Badge>
                        </th>
                  </tr>)}
                </tbody>
            </Table>
        </Container>
    )
}

export default Reftable

function deletefunc(refs, setRefs, setYearRange) {
    return async (citekey) => {
        const response = await refservice.deleteRef(citekey.reference)
        const newRefs = refs.filter((r) => r.citekey !== citekey.reference)
        response.status === 204 ? setRefs(newRefs) : console.log('error')
        setYearRange(countLimits(refs))
    }
}

function countLimits (object)  {
    const values = object.map((o) => o.year)
    return {min: Math.min(...values), max: Math.max(...values)}
}