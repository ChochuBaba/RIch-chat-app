import styles from './styles.module.css';
import React, { useState , useEffect} from 'react';
import { Editor } from "react-draft-wysiwyg"; //editor daal diya
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { EditorState } from 'draft-js';


const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]); // khaali suggestions
  
  

  //woh suggestions wala

  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log('suggestions wala array sadfsaf1');
      setRoomUsers(data);
      
      const z newSuggestions = data.map((user) => ({
        text: user.username.toUpperCase(),
        value: user.username.toLowerCase(),
      }));
  
      setSuggestions(newSuggestions);

    });


    


    return () => socket.off('chatroom_users');
  }, [socket]);

  //woh suggestions wala

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setRoomUsers(data);
    });
    return () => socket.off('chatroom_users');
  }, [socket]);

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setEditorState(
        () => EditorState.createEmpty()
      );
    }
  };

  // all the js wgysigysi
  const toolbarOptions = {
    options: [
      'inline',
      'blockType',
      'list',
      'link',
      'emoji',
      'image',
      'remove',
      'history',
    ],
    inline: {
      options: ['bold', 'italic', 'strikethrough'],
    },
    
    list: {
      options: ['unordered', 'ordered'],
    },
    link: {
      options: ['link'],
    },
    emoji: {
      options: ['emoji'],
    },
    image: {
      uploadEnabled: true,
    },
  };

  function createMarkup(html) {
        return {
          __html: DOMPurify.sanitize(html)
        }
  }

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    setMessage(convertedContent);
  }, [editorState]);

  //CONVERTED CONTENT USE KARNA HAI PASS KARNE KE LIYE MESSAGE MEIN





  //asdfsaf

  return (
    <div className={styles.sendMessageContainer}>
      
      
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={toolbarOptions}
        
        mention={{
            separator: ' ',
            trigger: '@',
            suggestions: [
              { text: 'APPLE', value: 'apple'  },
              { text: 'BANANA', value: 'banana' }
            ],
          }}
        
        
      />
      
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
      
      
    </div>
    

  );
};

export default SendMessage;

