fetch('http://localhost:8080/api/widgets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        collectionId: 1,
        type: 'LINK',
        timerType: 'INDEFINITE',
        content: { data: 'test' }
    })
}).then(res => res.json())
    .then(console.log)
    .catch(console.error);

let texto_prueba = "Holaaa Yanpol"
