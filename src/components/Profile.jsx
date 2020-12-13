import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';

import avatar from "../shared/images/Avatar.jpg"
import Header from './Header';
import Footer from './Footer';


 function Profile(props) {
    
        /*Heading*/
        const heading="Profile";
        const [player, setItem]=useState([]);
        const [isLoaded, setLoaded]=useState(false);
        const [photoPath, setphotoPath]=useState(avatar);
        const [image, setImage]=useState(null);
        console.log(photoPath)
        
        const photoChange=(e)=>{
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    console.log('here')
                    setphotoPath(reader.result)
                    console.log(photoPath)
                }
            }
            reader.readAsDataURL(e.currentTarget.files[0])
           
            console.log("here in photo Change")
            console.log(e.currentTarget.files[0])
            setImage(e.currentTarget.files[0])
           console.log(image)
            
            
        }

       const upload=()=>{
            const token=localStorage.getItem('token');
            const userId=localStorage.getItem('userId')
            const url="http://139.59.16.180:8989/upload-image/"+userId;
            console.log(token,url);
           
            var formData = new FormData()
            formData.append("file",image)
            console.log("image=",image,formData)
            Axios.post(url,
                formData,
                {headers: {Authorization: 'Bearer ' + token}},
                )
           .then(res => {
               console.log("data = "+res.data);
               alert("profile pic has been uploaded successfully");
               
           })
           .catch(err => {
               alert("there was an error uploading the profile pic");
               console.log('here is the error'+err)
               setphotoPath(avatar)
               setImage(null)
           })
        }
        

        useEffect(()=>{
            console.log(image)
            const token='Bearer '+localStorage.getItem('token');
            const userId=localStorage.getItem('userId');
            const URL='http://139.59.16.180:8989/profile/'+userId;
            console.log('here is the token '+token,' URL=',URL);
            Axios
            .get(URL, {headers : {'Authorization':token}})
            .then(res => {
                console.log(res)
                setItem(res.data.data)   
                console.log(res.data.data.image,res.data.data.id)
                if(res.data.data.image)
                {
                    let path="http://139.59.16.180/mahimaImages/images/admin/"+res.data.data.id+".jpg";
                    console.log("data=",path,typeof(path))
                setImage(path)
                setphotoPath(path)
                console.log(photoPath)
                }
                setLoaded(true)
                console.log(photoPath,isLoaded)
            
            })
            .catch(err=>{
               /* if(err.toString()==="Error: Request failed with status code 408")
                {
                 alert("Your session has expired login again to continue.")
                 localStorage.removeItem('token');
                console.log(localStorage.getItem('token'));
                props.history.push("/loggedout");
                }*/

                
                console.log(err)
                alert("Error Loading data")
                
            })
        },[]
        )
        if(isLoaded===false)
            return(
                <>
            <Header heading={heading} history={props.history}/>
            <div className="topPadding text-center">Loading.....</div>
            <Footer history={props.history} active={3}/>
            </>
            )
    


        return(
            <div>
                {/*Header Component*/}
                <Header heading={heading} history={props.history}></Header>

                {/*profile banner */}
                <div className="banner">
                    
                    {/*profile photo*/}
                    <div className="avatar">
                        <img src={photoPath} className="profileimg" alt="Avatar"></img>
                       
                    </div>

                </div>

                {/*add photo link*/}
                {
                     image===null?
                     <div className="addPhoto text-center">
                        <label for="img">Add photo</label>
                        <input type="file" onChange ={photoChange} id="img" name="img" accept="image/*" className="custom-file-input"></input>
                    </div>:
                    <div className="addPhoto text-center">
                        <label for="img">Change photo</label>
                        <input type="file" onChange ={photoChange} id="img" name="img" accept="image/*" className="custom-file-input"></input>
                    </div>

                 }
                 <div className="text-center upload" onClick={upload}>
                     upload<i className="fa fa-upload" aria-hidden="true"></i>
                 </div>

                {/*admin details*/}
                <div className="text-center userName">
                    {player.name}
                </div>
                <div className="text-center">
                    {player.email}
                </div>

                {/*add more details text*/}
                

                {/*Footer Component*/}
                <Footer history={props.history} active={3}></Footer>

            </div>

        )
}
export default Profile;