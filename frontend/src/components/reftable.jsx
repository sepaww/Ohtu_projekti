/* eslint-disable react/prop-types */
import { Table, Button } from "react-bootstrap"
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
        <Button variant="danger" onClick={handledelete}> Delete </Button>
    )
} 

const Reftable = ({references}) => {
    const rows2 = ["author", "journal", "title", "year"]
    const reference = references[0]
    console.log(reference)
    if (!reference)
    return <div> loadinng... </div>
    return (
        <Table id='entrylist'> 
            <thead> 
                <tr>
                    {rows2.map((r) => <th key={r}>{r}</th>)}
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
              </tr>)}
            </tbody>
        </Table>
    )
}

export default Reftable