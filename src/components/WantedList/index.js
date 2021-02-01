import React, { useCallback } from 'react'
import './index.css'

export default function WantedList(props) {
    return (
        <div className='wanted-list-wrapper'>
            <h2>FBI'S MOST WANTED</h2>
            {props.wantedPeople.map(person => {
                const {
                    images,
                    title,
                    description,
                    reward_max,
                    reward_min,
                    reward_text,
                    remarks,
                    sex,
                    subjects,
                    warning_message
                } = person

                if (title) {
                    // make name capitalized
                    const nameArr = title.split(' ')
                    const newNameArr = nameArr.map(name => {
                        // make name lowercase, then split chars
                        let splitName = name.toLowerCase().split('')
                        // make first letter uppercase, then return joined array
                        if (typeof (splitName[0]) === 'string') {
                            splitName[0] = splitName[0].toUpperCase()
                        }
                        return splitName.join('')
                    })
                    // join names back together
                    var name = newNameArr.join(' ')
                }

                // if there are remarks, remove <p> and </p> from it's string
                if (remarks) {
                    var modifiedRemarks = remarks.replace(/<p>/g, '')
                    modifiedRemarks = modifiedRemarks.replace(/<\/p>/g, '')
                }

                // get image from person obj
                const imgToUse = images[0].original || images[0].large || images[0].thumb

                // pick apart route for id of person
                const splitRoute = person['@id'].split('/')
                const personId = splitRoute[splitRoute.length - 1]

                // get english file from list of files
                var engFile = person.files.filter(file => file.name.toLowerCase() === 'english')
                engFile = engFile[0].url

                return <div className='person-card'>
                    <div className={`img-wrapper`} onClick={() => props.openImgInModal(images[0].original || images[0].large || images[0].thumb)}>
                        <img
                            src={imgToUse}
                            alt={`Image of wanted person ${title}`}
                            />
                        <i className='fas fa-search-plus'></i>
                    </div>
                    <div className={`info-wrapper`}>
                        <strong><p className='name'>{name}</p></strong>
                        <p className='description'>{description}</p>
                        <p className='reward'><strong>Reward:</strong> {!reward_max ? 'N/A' : reward_min || reward_min === 0 ? `$${reward_min} - $${reward_max}` : 'N/A'}</p>
                        <p className='gender'><strong>Sex:</strong> {sex || 'N/A'}</p>
                        <p className='subject'><strong>Subject(s):</strong> {subjects.join(', ') || 'N/A'}</p>
                        <p className='warning'>{warning_message ? `WARNING: ${warning_message}` : ''}</p>
                        <div className='btn-group'>
                            <a href={engFile} target='_blank'>Official File</a>
                        </div>
                    </div>
                </div>
            })}
            <div className={`page-btns${!props.isLoading ? ' show' : ''}`}>
                <button className='page-down' onClick={props.pageDown} disabled={props.page === 0}>Prev</button>
                <button className='page-up' onClick={props.pageUp} disabled={props.page * 10 + 9 >= props.wantedArr.length}>Next</button>
            </div>
            <div className={`loading-display${props.isLoading ? ' show' : ''}`}>
                <p>
                    Loading Data <i className='fad fa-spinner-third spinner'></i>
                </p>
            </div>
        </div>
    )
}
