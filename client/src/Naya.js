import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Naya.css';

function Naya() {
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
  }, [editorState]);

  console.log(convertedContent);

  return (
    <div className="App">
      <header className="App-header">
        Rich Text Editor Example
      </header>
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
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}
        
        
      />
      
      IDHAR SE SAARA HTML MILEGA
        <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
        </div>
    </div>
  )
}

export default Naya;