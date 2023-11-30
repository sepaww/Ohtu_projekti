/* eslint-disable react/prop-types */
import { Table, Button, Badge} from "react-bootstrap"
import refservice from "../Services/Refservice"


const Reftable = ({refs, setRefs}) => {
    const handledelete = async (citekey) => {
        console.log(citekey)
        const response = await refservice.deleteRef(citekey.reference)
        const newRefs = refs.filter((r) => r.citekey !== citekey.reference)
        console.log(newRefs)
        response.status === 204 ? setRefs(newRefs) : console.log('error')}

    const Delbutton = (citekey) => {
        return (
            <Button variant="danger" size="sm" onClick={() => handledelete(citekey)}> Delete </Button>
        )
    } 
    const rows2 = ["author", "journal", "title", "year",]
    if (!refs)
        return <div> loadinng... </div>

    return (
        <Table striped id="entrylist"> 
            <thead> 
                <tr>
                    {rows2.map((r) => <th key={r}>{r}</th>)}
                    <th> Delete</th>
                    <th> Citekey</th>
                </tr>
            </thead>
            <tbody> 
                {refs.map((ref) => 
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
    )
}

export default Reftable