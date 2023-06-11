export const request = (req) => {

    let address
    if (req === 'seedBrowserFolder')
        address = 'http://localhost:3000/browser-folder/seed'
    else if (req === 'queueBrowserFolder')
        address = 'http://localhost:3000/browser-folder/queue'

    const json =  fetch(address, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())

    return json
}