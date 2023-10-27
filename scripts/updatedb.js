const db = (reg, status) => {

    // Enable/Disable a review

    try {
        resp = fetch(`https://wwpspdb.kiniun.tech/reviews/${reg}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "enabled": status })
        });

        if (resp.ok) {
            console.log('The review has been updated successfully');
        }

    } catch (error) {
        console.error(error);
    }

}

db("4", false);
db("3", true);
