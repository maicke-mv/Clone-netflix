import React, {useState ,useEffect } from 'react';
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FilmeEmDestaque from './components/FilmeEmDestaque';
import Header from './components/Header'

export default () => {

  const [movieList, setMovieList] = useState([])
  const [featureData, setFeatureData] = useState([])
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      //Pegando o Filme Em Destaque
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
           
      setFeatureData(chosenInfo)
    }

    loadAll()
  
  },[])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)

    return() => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return(
    <div className="page">
      <Header black={blackHeader}/>
      {featureData && 
        <FilmeEmDestaque item={featureData}/>
      }
      <section className="lists">
        {movieList.map((item, key)=>(
          <div>
            <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>

      <footer>
        Feito por <strong>Maicke Massia</strong><br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site themoviedb.org
      </footer>

      {movieList.length <=0 && 
        <div className="loading">
          <img src="https://www.rchandru.com/images/portfolio/loading.gif" alt="Carregando"/>
        </div>
      }
    </div>
  )
}
