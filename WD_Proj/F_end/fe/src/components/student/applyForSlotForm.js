// ApplyForSlotPage.js
import React, { useState } from 'react';
import axios from 'axios';

const ApplyForSlotPage = () => {
    const [sectionId, setSectionId] = useState('');
    const [studentStatement, setStudentStatement] = useState('');

    const applyForSlot = () => {
        axios.post('http://localhost:5600/student/applyforSlot', { sectionId, studentStatement })
            .then(response => {
                alert('Application created successfully!');
            })
            .catch(error => {
                console.error('Error applying for slot:', error);
            });
    };

    return (
        <div>
            <h1>Apply for Slot</h1>
            <input
                type="text"
                value={sectionId}
                onChange={e => setSectionId(e.target.value)}
                placeholder="Section ID"
            />
            <textarea
                value={studentStatement}
                onChange={e => setStudentStatement(e.target.value)}
                placeholder="Student Statement"
            />
            <button onClick={applyForSlot}>Apply</button>
        </div>
    );
};

export default ApplyForSlotPage;
