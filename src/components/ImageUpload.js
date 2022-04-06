import React, { useState } from "react";
import { Button } from "@mui/material";
import {storage , db} from "./firebase.js";
import firebase from 'firebase/compat/app';
import './ImageUpload.css';

// function ImageUpload({username}){
// 	const [image,setImage] = useState(null);
// 	const [progress,setProgress] = useState(0);
// 	const [caption, setCaption] = useState('');	

// 	const handleChange = (e) => {
// 		if(e.target.files[0]) {            //get the 1st file from selected files
// 			setImage(e.target.files[0]);   //the setImage state to 1st file
// 		}
// 	};

// 	const handleUpload = () => {
// 		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		
// 		uploadTask.on(
// 			// on statechange give status of uploading time
// 			"state_changed", 
// 			(snapshot) => {
// 				// give progress between  0 - 100
// 				// for visual part
// 				const progress = Math.round(
// 					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
// 				);
// 				setProgress(progress);
// 			},
// 			(error) => {
// 				//for error
// 				console.log(error);
// 				alert(error.message); // temp
// 			},
// 			() => {
// 				storage
// 					.ref("images")
// 					.child(image.name)
// 					.getDownloadURL()
// 					.then((url) =>{
// 					//post image inside db 
// 					db.collection("posts").add({
// 					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
// 					caption: caption,
// 					imageUrl: url,
// 					username:username,  	
// 					});
						
// 					setProgress(0); 
// 					setCaption("");
// 					setImage(null);
// 				});
// 			}
// 		);
// 	};

// 	return(
// 		<div className="imageUpload">
// 			<progress className="imageupload__progress" value={progress} max="100" />
// 			<input 
// 			type="text" 
// 			placeholder="Caption..." 
// 			onChange={(event) => setCaption(event.target.value)} 
// 			value={caption}
// 			/>
// 			<input type="file" onChange={handleChange} />
// 			<Button className="imageupload__button" onClick={handleUpload}>
// 				Upload
// 			</Button>

// 		</div>
// 	)
// }

// export default ImageUpload;

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const imageRef = storage.ref("images").child(image.name);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = imageRef.put(image); //storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // storage
        //   .ref("images")
        //   .child(image.name)
        //   .getDownloadURL()
		imageRef.getDownloadURL().then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">

      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button className="imageupload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
