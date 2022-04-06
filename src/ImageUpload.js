import React, { useState } from "react";
import { Button } from "@mui/material";
import {storage , db} from "./firebase.js";
import firebase from 'firebase/compat/app';
import './ImageUpload.css';
// import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
// import {ref}  from "@firebase/storage";


function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (file) => {
	
	if (!file) return;
	// const storageref = ref(storage, `images/${file.name}`);
	// const uploadTask = uploadBytesResumable(storageref, file);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
			// await addDoc(collection(db, "posts"), {
			//   caption: caption,
            //   imageUrl: url,
            //   timestamp: serverTimestamp(),
            //   username: username,
			// });
            db.collection('posts').add({
              caption: caption,
              imageUrl: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
