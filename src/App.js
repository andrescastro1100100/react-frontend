import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {  
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    isCompleted: false,
    createDate: new Date(),
  });
  const [editingItem, setEditingItem] = useState(null);

  const handleInputChange = (e, item = newItem) => {
    setNewItem({ ...item, [e.target.name]: e.target.value });
  };

  const startEditItem = (item) => {
    setEditingItem(item);
    setNewItem(item);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5025/api/TodoItem')
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const addItem = () => {
    axios
      .post('http://localhost:5025/api/TodoItem', newItem)
      .then((response) => {
        setItems([...items, { ...newItem, id: response.data.id }]);
        setNewItem({
          title: '',
          description: '',
          isCompleted: false,
          createDate: new Date(),
        });
      })
      .catch((error) => console.error('Error adding item:', error));
  };

  const updateItem = () => {
    axios
      .put(`http://localhost:5025/api/TodoItem/${editingItem.id}`, newItem)
      .then((response) => {
        setItems(
          items.map((item) =>
            item.id === editingItem.id ? { ...newItem, id: item.id } : item
          )
        );
        setEditingItem(null);
        setNewItem({
          title: '',
          description: '',
          isCompleted: false,
          createDate: new Date(),
        });
      })
      .catch((error) => console.error('Error updating item:', error));
  };

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:5025/api/TodoItem/${id}`)
      .then((response) => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  


  const renderItems = () =>
    items.map((item) => (
      <div key={item.id} style={styles.item}>
        <div>
          <span style={styles.itemText}>
            Title: {item.title}
          </span>
          <span style={styles.itemText}>
            Description: {item.description}
          </span>
          <span style={styles.itemText}>
            Completed: {item.isCompleted ? 'Yes' : 'No'}
          </span>
          <span style={styles.itemText}>
            Create Date: {new Date(item.createDate).toLocaleDateString()}
          </span>
        </div>
        <div>
          <button style={styles.button} onClick={() => startEditItem(item)}>
            Edit
          </button>
          <button style={styles.button} onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </div>
      </div>
    ));

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Todo App</h1>

      <div style={styles.form}>
        <input
          type="text"
          name="title"
          value={newItem.title}
          onChange={editingItem ? (e) => handleInputChange(e, editingItem) : handleInputChange}
          placeholder="Title"
          style={styles.input}
        />
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={editingItem ? (e) => handleInputChange(e, editingItem) : handleInputChange}
          placeholder="Description"
          style={styles.input}
        />
        <button style={styles.button} onClick={editingItem ? updateItem : addItem}>
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
      </div>

      <div style={styles.itemsList}>{renderItems()}</div>
    </div>
  );

}


const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  header: {
    color: '#007bff',
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    margin: '20px 0',
  },
  input: {
    marginRight: '5px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '200px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  itemsList: {
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto',
  },
  item: {
    backgroundColor: '#fff',
    padding: '15px',
    margin: '15px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    marginRight: '15px',
    fontSize: '16px',
  },
};


// const styles = {
//   container: {
//     textAlign: 'center',
//     padding: '20px',
//   },
//   header: {
//     color: '#333',
//     marginBottom: '20px',
//   },
//   form: {
//     margin: '20px 0',
//   },
//   input: {
//     marginRight: '5px',
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '4px',
//     border: '1px solid #ddd',
//   },
//   button: {
//     padding: '10px 15px',
//     fontSize: '16px',
//     color: '#fff',
//     backgroundColor: '#007bff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginLeft: '5px',
//   },
//   itemsList: {
//     textAlign: 'left',
//     maxWidth: '500px',
//     margin: '0 auto',
//   },
//   item: {
//     backgroundColor: '#f9f9f9',
//     padding: '10px',
//     margin: '10px 0',
//     borderRadius: '4px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   itemText: {
//     marginRight: '10px',
//   },
// };

export default App;
