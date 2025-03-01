'use client';

import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axiosInstance from '@/app/utils/axiosInstance';

const Page = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handlePublish = async () => {
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Content:", content);

    try {
        const response = await axiosInstance.post("/posts", { title, description, content });
        alert('Blog published successfully!');
        console.log('Response:', response.data);
        setTitle("")
        setDescription("")
        setContent("");
    
    // Reset TipTap editor content
    editor?.commands.clearContent();

    } catch (error) {
        console.error('Error publishing blog:', error);

        if (error.response) {
            console.log('Response Data:', error.response.data);
            alert(`Failed to publish: ${error.response.data.message}`);
        } else {
            alert('Failed to publish blog. Please check your network.');
        }
    }
};



  return (
    <div className='w-full max-w-3xl mt-10 mx-auto p-4 bg-white shadow-md rounded-lg'>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded-md mb-3'
      />
      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded-md mb-3'
      />
      <div className='border border-gray-300 rounded-md p-2 mb-3'>
        {editor && <EditorContent editor={editor} className='min-h-[200px]' />}
      </div>
      <button
        onClick={handlePublish}
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
      >
        Publish
      </button>
    </div>
  );
};

export default Page;
