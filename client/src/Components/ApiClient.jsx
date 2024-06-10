import React, { useState } from 'react';
import axios from 'axios';

const ApiClient = () => {
  const [createData, setCreateData] = useState({ id: '', item: '' });
  const [readId, setReadId] = useState('');
  const [updateData, setUpdateData] = useState({ id: '', item: '' });
  const [deleteId, setDeleteId] = useState('');
  const [response, setResponse] = useState("Hello");

  const handleChange = (e, setState) => {
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e, endpoint, method, data = null) => {
    e.preventDefault();
    const url = `http://localhost:4000/${endpoint}`;
    axios({ method, url, data })
      .then(res => setResponse(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>REST API Client</h1>

      <h2>Create</h2>
      <form onSubmit={(e) => handleSubmit(e, 'create', 'post', createData)}>
        <input type="text" name="id" placeholder="ID" value={createData.id} onChange={(e) => handleChange(e, setCreateData)} />
        <input type="text" name="title" placeholder="Title" value={createData.title} onChange={(e) => handleChange(e, setCreateData)} />
        <input type="text" name="description" placeholder="Description" value={createData.description} onChange={(e) => handleChange(e, setCreateData)} />
        <button type="submit">Create</button>
      </form>

      <h2>Read</h2>
      <form onSubmit={(e) => handleSubmit(e, `read/${readId}`, 'get')}>
        <input type="text" name="id" placeholder="ID" value={readId} onChange={(e) => setReadId(e.target.value)} />
        <button type="submit">Read</button>
      </form>

      <h2>Update</h2>
      <form onSubmit={(e) => handleSubmit(e, `update/${updateData.id}`, 'put', updateData)}>
        <input type="text" name="id" placeholder="ID" value={updateData.id} onChange={(e) => handleChange(e, setUpdateData)} />
        <input type="text" name="title" placeholder="Title" value={updateData.item} onChange={(e) => handleChange(e, setUpdateData)} />
        <input type="text" name="description" placeholder="Description" value={createData.description} onChange={(e) => handleChange(e, setUpdateData)} />
        <button type="submit">Update</button>
      </form>

      <h2>Delete</h2>
      <form onSubmit={(e) => handleSubmit(e, `delete/${deleteId}`, 'delete', { id: deleteId })}>
        <input type="text" name="id" placeholder="ID" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        <button type="submit">Delete</button>
      </form>

      <h2>Response</h2>
      <pre>{response && JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ApiClient;
