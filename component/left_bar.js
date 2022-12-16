import React from "react";
import Styles from "../component/leftbar.module.css"
import { useState, useEffect } from "react";
export const LeftChat = (props) => {
    const [friendlist, setFriendlist] = useState([])


    useEffect(() => { //Setting default course list
        ReqFriendslist()

    }, [])

    const ReqFriendslist = async () => {

        const response = await fetch("/api/friendreq/reqfriendlist", {
            method: "POST",
            body: props.id
        })
        const res = await response.json()
        console.log(res.body)
        setFriendlist(res.body)

    }

    const FriendList = () => {
        console.log(friendlist)
        const ff = friendlist.map((info, index) =>
            <tr className="table-dark">
                <th scope="row">{index + 1}</th>
                <td>{info.username}</td>
                <td>{info.name}</td>
            </tr>
        )
        return ff
    }

    const FriendTable = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>

                    </tr>
                </thead>
                <tbody>
                    <FriendList />
                </tbody>
            </table>
        )
    }


    const SendFriends = async (e) => {
        e.preventDefault()
        console.log(props.id)
        if (e.target.Fusername.value === props.username) { //Idk if it works :(
            console.log("STOP!")
            return
        }
        else {
            const addUser = {
                fusername: e.target.Fusername.value,
                id: props.id
            }
            const response = await fetch("/api/friendreq/addfriend", {
                method: "POST",
                body: JSON.stringify(addUser)
            })
            const res = await response.json()
            console.log(res) //Error message
            console.log(response.status) //Show Error Status
            //if error don't do below
            if (response.status === 500) { //if error, don't do and return
                return
            }
            else {
                ReqFriendslist() //Call update
            }
        }
    }
    return (
        <div className={Styles.mainlay}>
            <button className="btn btn-primary" onClick={ReqFriendslist}>COCK</button>
            <h2 className="bg-success p-1 pb-2 m-0 text-center mg"> Add Friends</h2>
            <div className="bg-white text-center "><form className="form-inline" onSubmit={SendFriends}>
                <div className="input-group">
                    <input type="email" className="form-control" id="Fusername" name="Fusername" placeholder="Your Friends Username here!" />
                    <button className="btn btn-primary" type="submit">Find</button>
                </div>
            </form></div>
            <FriendTable />
        </div>
    )

}