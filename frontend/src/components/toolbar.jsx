/* eslint-disable react/prop-types */
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import { Stack, Form, Dropdown, DropdownButton, InputGroup, Button, ListGroup, Container} from 'react-bootstrap'
import { useEffect, useState } from 'react'


    
const Toolbar = ({filter, setFilters, yearRange, setLimits, limits}) => {
    
    const [Activefilter, setActiveFilter] = useState("All")
    const [filterField, setFilter] = useState("")

    const updateFilter = () => {
        setFilters({...filter, criterias: {[Activefilter]: filterField}})
    }
    const clearFilter = () => {
        setFilters({...filter, ...{criterias: {}}})
    }

    const FilterGroup = () => {
        const isFilters = JSON.stringify(filter.criterias) !== '{}'
        return (
            <div size="sm"> 
                {isFilters && "Active filter"}
                    <ListGroup horizontal="sm" >
                        {Object.keys(filter.criterias).map((key) => <ListGroup.Item key={key}> {`${key}: ${filter.criterias[key]}`}</ListGroup.Item>)}
                    {isFilters && <Button variant="outline-primary" onClick={clearFilter} className='mx-2'> Reset</Button>}
                </ListGroup>
            </div>
        )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { setFilters({...filter, ...{year: limits}})}, [limits])

    return(
        <Container className='my-2'> 
        <Form >       
            <Stack direction='horizontal' gap={2}> 
            <div className='col-2'> 
                <Form.Control type="min" size='sm' value={limits.min} onChange={(e) => setLimits({min: e.target.value, max: limits.max})}/>
            </div>
            <div className='col-4'> 
                <RangeSlider className='formControlRange'  value={[limits.min,limits.max]} defaultValue={[limits.min, limits.max]} min={yearRange.min} max={yearRange.max} step={1} onInput={(e) => setLimits({min: e[0], max: e[1]})}/>
            </div>
            <div className="col-2" id='2-max'> 
                <Form.Control type="max" size='sm' value={limits.max} onChange={(e) => {
                    setLimits({min: limits.min, max: e.target.value})}}
                    />
            </div>        
            <div className='ms-auto'> 
                <InputGroup size='sm' > 
                    <DropdownButton 
                        variant='outline-secondary'
                        title={Activefilter}
                        id='filter-select-button-1'
                        onSelect = {(e) => setActiveFilter(e)}
                        >
                        <Dropdown.Item eventKey="All" id='all-filterll'> All</Dropdown.Item>
                        <Dropdown.Item eventKey="Author" id="auth-filter"> Author</Dropdown.Item>
                        <Dropdown.Item eventKey= "Title"id='title-filter'> Title</Dropdown.Item>
                    </DropdownButton>
                    <Form.Control 
                        placeholder='add a filter'
                        aria-label='Set Filter'
                        value={filterField}
                        onChange={(e) => setFilter(e.target.value)}
                    ></Form.Control>
                        <Button 
                        variant='outline-success'
                        onClick={updateFilter}
                        > 
                        Add </Button>
                </InputGroup>
            </div>
            </Stack>
        </Form>
        <FilterGroup/> 
    </Container>
    )
}


export default Toolbar