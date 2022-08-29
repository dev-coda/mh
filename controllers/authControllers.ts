
import express, {Request, Response} from "express"

const login = async (req : Request, res : Response) => {
    console.log("Route hit")
    res.json({route: "hit"})
}

module.exports = {login}