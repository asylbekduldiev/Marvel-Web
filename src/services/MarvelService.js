import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error,clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'

    const _apiKey = 'apikey=d2e5448ff4da4e09a732da20445bf084'

    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_trarnsformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _trarnsformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_trarnsformComics)
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _trarnsformComics(res.data.results[0])
    }

    const _trarnsformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }

    }

    const _trarnsformComics = (comics) =>{
        return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
        }
    }

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
        getComics
    }
}

export default useMarvelService;