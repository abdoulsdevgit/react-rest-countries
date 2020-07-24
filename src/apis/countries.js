async function getData(url) {
    let response = null;
    let data = null;
    try {
        response = await fetch(url);
        data = await response.json();
    } catch(err) {
        throw new Error(err);
    }
    
    return data;
}


export {getData}