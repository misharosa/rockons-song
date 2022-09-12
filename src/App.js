import React, { useEffect, useState } from 'react';
import "./App.css"
import { useFetch } from "./useFetch";
import { useFilter } from "./useFilter";
import { addItemFromServer, deleteItemFromServer } from "./server/api";

export const App = () => {
    const [songs, setSongs] = useState([])
    const [postValue, setPostValue] = useState('')

    const { data }  = useFetch('http://localhost:3001/songs')
    const { filteredItems, filterValue, setFilterValue } = useFilter(songs)

    useEffect(() => {
        setSongs(data)
    },[data])

    const handlePost = () => {
        addItemFromServer({ title: 'RockOns', name: postValue, id: filteredItems.length + 1 })
            .catch(e => console.log(e.message))
        songs.push({ title: 'RockOns', name: postValue, id: filteredItems.length + 1 })
        setSongs(songs)
        setPostValue('')
    }

    const handleDelete = (songId) => {
        const deleteItem = songs.filter((song) => song.id !== songId)
        setSongs(deleteItem)

        deleteItemFromServer(songId).catch(e => console.log(e.message))
    }

    return (
        <div className="App">
            <div className="nav">
                <img className="nav__img" src="https://i.scdn.co/image/ab67616d0000b2734ea2c03cd7eb43dde2b6ca41" alt="icon"/>
                <ul className="nav__list">
                    <li className="nav__item">
                        <label style={{marginRight: "5px"}} htmlFor="filter">{"Search:"}</label>
                        <input className="text-field__input" id="filter" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} type="text" />
                    </li>
                    <li className="nav__item">Menu</li>
                    <li className="nav__item">Contact</li>
                </ul>
                <div className="nav__item">Exit</div>
            </div>

            <div className="text-field">
                <label className="text-field__label" htmlFor="song">Song: </label>
                <input style={{marginRight: "5px"}} value={postValue} onChange={(e) => setPostValue(e.target.value)} className="text-field__input" type="text" name="song" id="song"  placeholder="add name..."/>
                <button className="button-8" type="button" onClick={() => handlePost()}>Post</button>
            </div>

            {filteredItems?.map(i => (
                    <div className="song">
                        <div className="song__item" key={i.id}>{i.title}: <span style={{display: "inline"}}>{i.name}</span></div>
                        <img
                            className="song__garbage__button"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/OOjs_UI_icon_trash-destructive.svg/2048px-OOjs_UI_icon_trash-destructive.svg.png"
                            alt="garbageImg"
                            onClick={() => handleDelete(i.id)}
                        />
                    </div>
            ))}
        </div>
    );
}
