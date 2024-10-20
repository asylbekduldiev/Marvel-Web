import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'

    const _akiKey = 'apikey=d2e5448ff4da4e09a732da20445bf084'

    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_akiKey}`);
      return res.data.results.map(_trarnsformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_akiKey}`);
        return _trarnsformCharacter(res.data.results[0])
    }
    const _trarnsformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }

    }
    return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService;