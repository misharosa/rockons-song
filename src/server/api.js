import axios from "axios";

export const addItemFromServer = async (Item) => {
    return await axios.post(`http://localhost:3001/songs`, Item);
};

export const deleteItemFromServer = async (itemId) => {
    return await axios.delete(`http://localhost:3001/songs/${itemId}`)
}