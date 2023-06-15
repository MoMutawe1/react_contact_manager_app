import React from "react";
import user from "../images/user.png";

export default function ContactCard(props) {

    const { id, name, email} = props.contact;
    return (
            <div className="item">
                <img className="ui avatar image" src={user} alt="user" />
                <div className="content">
                    <div className="header">
                        <div className="header"> {name} </div>
                        <div> {email} </div>
                    </div>
                </div>
                <i className="trash alternate outline icon" style={{color:"red", marginTop:"7px"}} />
            </div>
    );
}