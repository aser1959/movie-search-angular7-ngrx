export  interface IMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
}

export class MovieA implements IMovie {
    Title = '';
    Year = '';
    imdbID = '';
    Type = '';
    Poster = '';
    Genre ? = '';
    Director ? = '';
    Writer ? = '';
    Actors ? = '';
    Plot ? = '';
}
