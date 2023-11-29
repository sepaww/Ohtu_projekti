/* eslint-disable react/prop-types */
import { Table, Button, Badge} from "react-bootstrap"
import refservice from "../Services/Refservice"
const Delbutton = (citekey) => {
    const handledelete = async () => {
        await refservice.deleteRef(citekey.reference)
        console.log("Deleted")
    }
    return (
        <Button variant="danger" size="sm" onClick={handledelete}> Delete </Button>
    )
} 

const Reftable = ({references}) => {
    const rows2 = ["author", "journal", "title", "year",]
    if (!references)
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
                {references.map((ref) => 
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