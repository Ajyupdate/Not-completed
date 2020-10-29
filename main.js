const searchInput = document.getElementById('search')
const googleMap = document.getElementById('googleMap')
const asyncResult = document.getElementById('asyncResult')
const Submit = document.getElementById('submit')

const searchStates = async searchText => {
    const res = await fetch('state.json')
    const states = await res.json()
    
    
    //gET MATCHES
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, "gi")
        return state.name.match(regex) || state.abbr.match(regex)
    })
    if(searchText.length == 0){
        matches = []
    }
    outputHTML(matches)
    
}

//show results in HTML
const outputHTML = matches => {
    if(matches.length > 0){
          const html = matches.map(
              match => `
              <div class = card card-body mb-1">
              <div><h4>${match.name} (${match.abbr})</div>
              <div><small>lat:${match.lat} / long:${match.long}</small></div></div>
              `
          ).join('')
       
        asyncResult.innerHTML = html    
        
        
    }
}

searchInput.addEventListener('input', () => searchStates(searchInput.value)) 


