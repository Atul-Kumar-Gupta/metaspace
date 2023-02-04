import React, { useEffect, useState } from "react"
import "./homepage.css"
import { useHistory } from "react-router-dom"
import axios from "axios"

const Homepage = () => {
    const [data, setData] = useState(null)
    const history = useHistory();
    const token = localStorage.getItem('token');
    const userDetail = JSON.parse(localStorage.getItem('ud.detail'));
    if (token) {
        history.push("/")
    }
    else if (!token) {
        history.push("/login")
    }

    const removeStorage = () => {
        localStorage.removeItem("ud.detail");
        localStorage.removeItem("token");
        history.push("/login")

    }

    useEffect(() => {
        axios.get("https://www.fishwatch.gov/api/species")
            .then(res => {
                if(res.status == 200){
                    setData(res.data.slice(0,10))
                }
                else{
                    alert('Some Error occured during fetching data')
                }
            })
    }, [])
    return (

        <div className="">
            <button className="button" onClick={() => removeStorage()} >Logout</button>

            <h1>{userDetail.firstName && userDetail.lastName ? 'Hello' + " " + userDetail.firstName + " " + userDetail.lastName : 'Hello Homepage'}

            </h1>

            <p>
                Blow are the data available fetched from given API
            </p>
            <table id="metaspace">
                <tr>
                    <th>Species Name</th>
                    <th>Scientific Name</th>
                    <th>Population</th>
                </tr>
                {data && data.length > 0 && data.map(item => {
                    return (
                        <tr>
                            <td>{item['Species Name']}</td>
                            <td>{item['Scientific Name']}</td>
                            <td>{item.Population}</td>


                        </tr>

                    )
                })




                }
            </table>
        </div>
    )
}

export default Homepage