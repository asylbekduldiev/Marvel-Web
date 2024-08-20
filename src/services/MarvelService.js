class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'

    _akiKey = 'apikey=d2e5448ff4da4e09a732da20445bf084'

    _baseOffset = 210;

    getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

        return await res.json();
    }   

    getAllCharacters = async (offset = this._baseOffset) => {
      const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._akiKey}`);
      return res.data.results.map(this._trarnsformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._akiKey}`);
        return this._trarnsformCharacter(res.data.results[0])
    }
    _trarnsformCharacter = (char) => {
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
}

export default MarvelService;