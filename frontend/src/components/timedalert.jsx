/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

export default function TimedAlert({ msg }) {
    const [show, setShow] = useState(false)

    // eslint-disable-next-line
    useEffect(() => {
        if (msg.variant !== "boot") {
            setShow(true)
            setTimeout(() => setShow(false), 3000)
        }
    })

    return (
        <Alert show={show} variant={msg.variant}>{msg.text}</Alert>
    )
}