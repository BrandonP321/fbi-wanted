import React, { useState, useRef, useEffect } from 'react'
import './index.css'

const Header = () => null
Header.displayName = 'Header'

const Body = () => null
Body.displayName = 'Body'

function FilterCollapse(props) {
    const [showCollapse, setShowCollapse] = useState(false)

    const collapseHeader = useRef();
    const collapseBody = useRef();
    const collapseBodyText = useRef();

    useEffect(() => {
        // if collapse is being shown, set collapse body's height to height of text div inside of it
        if (showCollapse) {
            const textHeight = collapseBodyText.current.clientHeight;
            console.log('new height is ', textHeight)
            collapseBody.current.style.height = `${textHeight}px`
        } else {
            // else set collapseBody height to 0
            collapseBody.current.style.height = '0px'
        }
    }, [showCollapse])

    const toggleCollapse = () => {
        setShowCollapse(!showCollapse);
    }

    const renderHeader = () => {
        // try to find Header sub-component among children of FilterCollapse
        const header = findByType(props.children, Header);

        // if no header was found, return null
        if (!Header) return null;

        // else return the children of the Header sub-component
        return <div className='filter-collapse-header' onClick={toggleCollapse} ref={collapseHeader}>
            {header.props.children}
        </div>
    }

    const renderBody = () => {
        // try to find Body sub-component among children of FilterCollapse
        const body = findByType(props.children, Body);

        // if no body was found, return null
        if (!body) return null;

        // else return the children of the Body sub-component
        return <div className='text-wrapper' ref={collapseBodyText}>
            {body.props.children}
        </div>
    }

    return (
        <div className='filter-collapse'>
            {renderHeader()}
            <div className='filter-collapse-body' ref={collapseBody}>
                {renderBody()}
            </div>
        </div>
    )
}

FilterCollapse.Header = Header;
FilterCollapse.Body = Body;

export default FilterCollapse;

// function to find a sub component in a components children
const findByType = (children, component) => {
    let result = null

    const type = component.displayName

    React.Children.forEach(children, child => {
        const childType = child && child.type && child.type.displayName
        if (type === childType) {
            result = child
        }
    })

    return result
}