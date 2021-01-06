/* 
 * Difference here between the client-side fetching of datas and the static-side fetching
 * is that we load the data the first time we build the page alrdy and once the 
 * user reaches this page, the page is already loaded with all the necessary datas
 * and can simply show up the page without a long loading time. 
 * 
 * The way this has been done is by fetching the data inside the 
 * "export const getStaticProps" async function, which will initially load all the datas
 * and then put the required datas inside an object with the attribute props. These
 * props can then be accessed by the Component via "const StaticSide = (props) =>"
 * and can instantly be used to do whatever u wish to do with that data on that page
 * 
 * The differences in performance is HUGE and is only seen if u have the site deployed
 * already (example on netlify). You wont be able to notice a big difference in localhost
 * since localhost rebuilds the app everytime u refresh the page, wherease in a production
 * page it wont rebuild, but rather just use the components props to refresh the page,
 * without any requests and fetching.
 */

import axios from 'axios'

const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const headers = {
  'Cache-Control': 'no-cache'
}

const StaticSide = (props) => {
  console.log('props', props)

  return props.pokemon.map((poke) => {
    return (
      <div key={poke.name}>
        <img src={poke.imgUrl} />
        <p>{poke.name}</p>
        <hr />
      </div>
    )
  })
}

export const getStaticProps = async () => {
  const response = await axios.get(url, { headers })

  const promises = response.data.results.map((result) => {
    return axios.get(result.url, { headers })
  })

  const responses = await Promise.all(promises)

  const pokeData = responses.map((response) => {
    return {
      name: response.data.name,
      imgUrl: response.data.sprites.front_default
    }
  })

  return {
    props: {
      pokemon: pokeData
    }
  }
}

export default StaticSide