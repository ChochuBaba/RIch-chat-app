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
  const [roomUsers, setRoomUsers] = useState([]);
  
  //to get the room users

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      setRoomUsers(data);
      console.log('yaah par users ka data');
      const suggestions = data.map(user => ({
        text: user.username.toUpperCase(),
        value: user.username.toLowerCase()
      }));

      setSuggestions(suggestions);
    });
    
  //for the at functionality

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
    blockType: {
      options: ['Normal', 'Blockquote', 'Code'],
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
    const html = convertToHTML({
      blockToHTML: (block) => {
        if (block.type === 'code') {
          return <pre><code>{block.text}</code></pre>;
        }
        // Handle other block types if needed
      },
    })(editorState.getCurrentContent());
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
            suggestions: suggestions,
          }}
        
        
      />
      
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
      
      
    </div>
    

  );
};

export default SendMessage;

