/* eslint-disable react/prop-types */
import { Table, Button, Badge} from "react-bootstrap"
const Delbutton = () => {
    const handledelete = async () => {
        // simuloidaan postamiseen menevää aikaa
        const promise = new Promise((resolve) => {
            setTimeout(resolve, 350)
        })
        await promise 
        console.log("Deleted")
    }
    return (
        <Button variant="danger" size="sm" onClick={handledelete}> Delete </Button>
    )
} 

const Reftable = ({references}) => {
    const rows2 = ["author", "journal", "title", "year",]
    const reference = references[0]
    console.log(reference)
    if (!reference)
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
                        <Delbutton/> 
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