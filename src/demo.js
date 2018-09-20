import { jsonCache }    from './jsonCache'

let testJsonCache = async function() {

    const data = [
        {
            id: 1,
            name: 'demo 1'
        },
        {
            id: 2,
            name: 'demo 2'
        },
    ]

    jsonCache.write(data, 'demo')

    let finalResult = await jsonCache.getMostRecentFile('demo')

    console.log(finalResult)
}

testJsonCache()