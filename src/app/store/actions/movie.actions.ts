import { Action } from '@ngrx/store';
import { IMovie } from '@models/movie';
import { IStore } from '@services/local-storage.service';


export enum MovieActionTypes {
    Add = '[Movie Search] Add',
    Add20 = '[Movie Search] Add20',
    AddSuccess = '[Movie Search] AddSuccess',
    Remove = '[Movie Search] Remove',
    RemoveById = '[Movie Search] RemoveById',
    Remove20 = '[Movie Search] Remove20',
    GetById = '[Movie Search] GetById',
    GetByIdSuccess = '[Movie Search] GetByIdSuccess',
    SearchAdd = '[Movie Search] SearchAdd',
    SearchRemove = '[Movie Search] SearchRemove',
    NumberViewPageAdd = '[Movie Search] NumberViewPageAdd',
    NumberViewPageRemove = '[Movie Search] NumberViewPageRemove',
    MaxStoryViewsSet = '[Movie Search] MaxStoryViewsSet',
    MaxStoryViewsSetSuccess = '[Movie Search] MaxStoryViewsSetSuccess',
    GetStorage = '[Movie Search] GetStorage',
    GetStorageSuccess = '[Movie Search] GetStorageSuccess'
}

export class MovieAdd implements Action {
    readonly type = MovieActionTypes.Add;
    constructor(public payload: IMovie) {}
}

export class MovieAddSuccess implements Action {
    readonly type = MovieActionTypes.AddSuccess;
    constructor(public payload: IMovie) {}
}


export class MovieRemove implements Action {
    readonly type = MovieActionTypes.Remove;
    constructor(public payload: number = 1) {}
}

export class MovieRemoveById implements Action {
    readonly type = MovieActionTypes.RemoveById;
    constructor(public payload: string) {}
}

export class MovieAdd20 implements Action {
    readonly type = MovieActionTypes.Add20;
    constructor(public payload: IMovie[]) {}
}

export class MovieRemove20 implements Action {
    readonly type = MovieActionTypes.Remove20;
    constructor() {}
}

export class GetMovieById implements Action {
    readonly type = MovieActionTypes.GetById;
    constructor(public payload: string) {}
}

export class GetMovieByIdSuccess implements Action {
    readonly type = MovieActionTypes.GetByIdSuccess;
    constructor(public payload: IMovie) {}
}

export class SetSearch implements Action {
    readonly type = MovieActionTypes.SearchAdd;
    constructor( public payload: string ) {}
}

export class RemoveSearch implements Action {
    readonly type = MovieActionTypes.SearchRemove;
    constructor() {}
}

export class SetNumberViewPage implements Action {
    readonly type = MovieActionTypes.NumberViewPageAdd;
    constructor( public payload: number ) {}
}

export class RemoveNumberViewPage implements Action {
    readonly type = MovieActionTypes.NumberViewPageRemove;
    constructor() {}
}

export class SetMaxStoryViews implements Action {
    readonly type = MovieActionTypes.MaxStoryViewsSet;
    constructor( public payload: number ) {}
}

export class SetMaxStoryViewsSuccess implements Action {
    readonly type = MovieActionTypes.MaxStoryViewsSetSuccess;
    constructor( public payload: number ) {}
}

export class GetLocalStorage implements Action {
    readonly type = MovieActionTypes.GetStorage;
    constructor() {}
}

export class GetLocalStorageSuccess implements Action {
    readonly type = MovieActionTypes.GetStorageSuccess;
    constructor(public payload: IStore) {}
}

export type MovieActions =
      MovieAdd
    | MovieRemove
    | MovieRemoveById
    | GetMovieById
    | GetMovieByIdSuccess
    | MovieAddSuccess
    | MovieAdd20
    | MovieRemove20
    | SetSearch
    | RemoveSearch
    | SetNumberViewPage
    | RemoveNumberViewPage
    | SetMaxStoryViews
    | SetMaxStoryViewsSuccess
    | GetLocalStorage
    | GetLocalStorageSuccess;
