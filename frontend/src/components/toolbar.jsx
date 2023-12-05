/* eslint-disable react/prop-types */
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import { Stack, Form, Dropdown, DropdownButton, InputGroup, Button, ListGroup, Container} from 'react-bootstrap'
import { useState } from 'react'

export default function Toolbar({ filters, setFilters, limits }) {
    const [activeFilter, setActiveFilter] = useState("All")
    const [filterField, setFilterField] = useState("")
    
    const updateFilterText = () => {
        setFilters({...filters, text: {...filters.text, [activeFilter.toLowerCase()]: filterField}})
    }

    const updateFilterYear = (low, up) => {
        setFilters({...filters, year: {min: low, max: up}})
    }

    const clearFilter = () => {
        setFilters({...filters, text: Object.keys(filters.text).reduce((acc, cur) => ({...acc, [cur]: ""}), {})})
    }

    const FilterGroup = () => {
        const isClear = Object.values(filters.text).every(v => v === "")

        return isClear ? null : (
            <div size="sm"> 
                Active filter
                <ListGroup horizontal="sm" style={{ textTransform: 'capitalize' }}>
                    {Object.keys(filters.text).map((key) => 
                    <ListGroup.Item key={key}>{`${key}: ${filters.text[key]}`}</ListGroup.Item>
                    )}
                    <Button variant="outline-primary" onClick={clearFilter} className='mx-2' id='reset_button'>Reset</Button>
                </ListGroup>
            </div>
        )
    }

    return(
        <Container className='my-2'> 
        <Form>       
            <Stack direction='horizontal' gap={2}> 
            <div className='col-2'> 
                <Form.Control type="min" size='sm' id='small_year' value={filters.year.min} onChange={e => updateFilterYear(e.target.value, filters.year.max)}/>
            </div>
            <div className='col-4'> 
                <RangeSlider className='formControlRange' value={[filters.year.min, filters.year.max]} defaultValue={[limits.min, limits.max]} min={limits.min} max={limits.max} step={1} onInput={e => updateFilterYear(e[0], e[1])}/>
            </div>
            <div className="col-2" id='2-max'> 
                <Form.Control type="max" size='sm' id='large_year' value={filters.year.max} onChange={e => updateFilterYear(filters.year.min, e.target.value)}/>
            </div>        
            <div className='ms-auto'> 
                <InputGroup size='sm'> 
                    <DropdownButton 
                        variant='outline-secondary'
                        title={activeFilter}
                        id='filter-select-button-1'
                        onSelect = {(e) => setActiveFilter(e)}
                    >
                        <Dropdown.Item eventKey="All" id='all-filter'>All</Dropdown.Item>
                        <Dropdown.Item eventKey="Author" id="auth-filter">Author</Dropdown.Item>
                        <Dropdown.Item eventKey="Title" id='title-filter'>Title</Dropdown.Item>
                    </DropdownButton>
                    <Form.Control 
                        id='filter_word'
                        placeholder='add a filter'
                        aria-label='Set Filter'
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                    />
                    <Button id='add_filter' variant='outline-success' onClick={updateFilterText}> 
                        Add
                    </Button>
                </InputGroup>
            </div>
            </Stack>
        </Form>
        <FilterGroup/> 
    </Container>
    )
}