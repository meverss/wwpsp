const os = require('os');
const fs = require('fs');

const db = () => {

    // Enable/Disable a review

    try {
        const reg = 4;
        const enabled = false;
        resp = fetch(`https://wwpspdb.kiniun.tech/reviews/${reg}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "enabled": enabled })
        });

        if (resp.ok) {
            console.log('The review has been updated successfully');
        }

    } catch (error) {
        console.error(error);
    }

}
