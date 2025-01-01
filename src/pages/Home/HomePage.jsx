// import { useState, useEffect } from "react";
// import "./HomePage.scss";
// import Card from "../../components/card/card";

// const HomePage = () => {
//   const [users, setUsers] = useState([]);
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [popupType, setPopupType] = useState(""); // "add", "edit", "delete"
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState({
//     name: "",
//     phoneNumber: "",
//     place: "",
//     month: "",
//     date: "",
//     amount: "", // New field for amount
//   });
//   const [selectedAdmin, setSelectedAdmin] = useState(""); // Tracks the selected admin
//   const [isDeletePopupVisible, setDeletePopupVisible] = useState(false); // for delete popup
//   const [userToDelete, setUserToDelete] = useState(null); // store user to be deleted

//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const admins = [
//     "Raji",
//     "John Doe",
//     "Jane Smith",
//     "Alice Johnson",
//     "Bob Brown",
//   ];

//   const fetchUsers = async (admin) => {
//     if (!admin) return; // Don't fetch if no admin selected
  
//     try {
//       const response = await fetch(`http://localhost:3001/api/users/${admin}`);
//       const data = await response.json();
//       console.log("Fetched data:", data); // Add this line to log the data
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedAdmin) {
//       fetchUsers(selectedAdmin); // Fetch users when selectedAdmin changes
//     }
//   }, [selectedAdmin]); // Dependency array ensures it's refetched when selectedAdmin changes

//   const handleCardClick = (admin) => {
//     setUsers([]); // Clear old user data
//     setSelectedAdmin(admin);
//   };

//   const handlePopupOpen = (type, user = null) => {
//     setPopupType(type);
//     setPopupVisible(true);

//     if (type === "edit" && user) {
//       setCurrentUser(user);
//       setUserData({
//         name: user.name,
//         phoneNumber: user.phoneNumber,
//         place: user.place,
//         month: user.month,
//         date: user.date.split("T")[0],
//         amount: user.amount, // Set amount when editing
//       });
//     } else if (type === "add") {
//       setUserData({ name: "", phoneNumber: "", place: "", month: "", date: "", amount: "" });
//       setCurrentUser(null);
//     }
//   };

//   const handlePopupClose = () => {
//     setPopupVisible(false);
//     setDeletePopupVisible(false); // close delete popup
//     setUserData({ name: "", phoneNumber: "", place: "", month: "", date: "", amount: "" });
//     setCurrentUser(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url =
//         popupType === "add"
//           ? "http://localhost:3001/api/users" // Correct POST URL
//           : `http://localhost:3001/api/users/${selectedAdmin}/${currentUser._id}`;
//       const method = popupType === "add" ? "POST" : "PUT";
  
//       const body = JSON.stringify({
//         ...userData,
//         admin: selectedAdmin, // Ensure admin is included in the request body
//       });
  
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body,
//       });
  
//       if (response.ok) {
//         fetchUsers(selectedAdmin); // Refetch users after adding/updating
//         handlePopupClose();
//       } else {
//         console.error("Error saving user:", await response.text());
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
  
  

//   const handleDeletePopupOpen = (user) => {
//     setUserToDelete(user);
//     setDeletePopupVisible(true);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/users/${selectedAdmin}/${userToDelete._id}`,
//         {
//           method: "DELETE",
//         }
//       );
  
//       if (response.ok) {
//         fetchUsers(selectedAdmin); // Refetch users after deleting
//         handlePopupClose();
//       } else {
//         console.error("Error deleting user:", await response.text());
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };
  

//   return (
//     <div className="home-container">
//       <div className="home-container__card-container">
//         {admins.map((admin) => (
//           <Card key={admin} name={admin} onClick={() => handleCardClick(admin)} />
//         ))}
//       </div>

//       <div className="home-container__table-container">
//         <div className="home-container__table-container__heading">
//           <h2>{selectedAdmin ? `${selectedAdmin}` : "Select an Admin"}</h2>
//           {selectedAdmin && (
//             <button onClick={() => handlePopupOpen("add")}>Add User</button>
//           )}
//         </div>

//         {selectedAdmin && (
//           <table className="home-container__table-container__table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Phone</th>
//                 <th>Place</th>
//                 <th>Month</th>
//                 <th>Date</th>
//                 <th>Amount</th> {/* New column for amount */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users
//                 // .filter((user) => user.admin === selectedAdmin)
//                 .map((user) => (
//                   <tr key={user._id}>
//                     <td>{user.name}</td>
//                     <td>{user.phoneNumber}</td>
//                     <td>{user.place}</td>
//                     <td>{user.month}</td>
//                     <td>{new Date(user.date).toLocaleDateString()}</td>
//                     <td>{user.amount}</td> {/* Display amount */}
//                     <td>
//                       <button onClick={() => handlePopupOpen("edit", user)}>Edit</button>
//                       <button onClick={() => handleDeletePopupOpen(user)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {isPopupVisible && popupType !== "delete" && (
//         <div className="home-container-popup">
//           <div className="home-container-popup__content add-edit-popup">
//             <form onSubmit={handleSubmit}>
//               <h3>{popupType === "add" ? "Add New User" : "Edit User"}</h3>

//               <div>
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={userData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label>Phone Number</label>
//                 <input
//                   type="number"
//                   name="phoneNumber"
//                   value={userData.phoneNumber}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label>Place</label>
//                 <input
//                   type="text"
//                   name="place"
//                   value={userData.place}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label>Month</label>
//                 <select
//                   name="month"
//                   value={userData.month}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select Month</option>
//                   {months.map((month) => (
//                     <option key={month} value={month}>
//                       {month}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label>Date</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={userData.date}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label>Amount</label>
//                 <input
//                   type="number"
//                   name="amount"
//                   value={userData.amount}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="form__actions">
//                 <button type="submit">
//                   {popupType === "add" ? "Save" : "Update"}
//                 </button>
//                 <button type="button" onClick={handlePopupClose}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {isDeletePopupVisible && (
//         <div className="home-container-popup">
//           <div className="home-container-popup__content delete-popup">
//             <h3>Confirm Delete</h3>
//             <p>Are you sure you want to delete this client?</p>
//             <div className="form__actions">
//               <button type="submit" onClick={handleDelete}>
//                 Yes, Delete
//               </button>
//               <button type="button" onClick={handlePopupClose}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import Card from "../../components/card/card";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState(""); // "add", "edit"
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    place: "",
    date: "",
    amount: "",
    month: "",
  });
  const [selectedAdmin, setSelectedAdmin] = useState("");
      const [isDeletePopupVisible, setDeletePopupVisible] = useState(false); // for delete popup
    const [userToDelete, setUserToDelete] = useState(null); // store user to be deleted

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const admins = [
    "Raji",
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
  ];

  const fetchUsers = async (admin) => {
    if (!admin) return;

    try {
      const response = await fetch(`http://localhost:3001/api/users/${admin}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (selectedAdmin) {
      fetchUsers(selectedAdmin);
    }
  }, [selectedAdmin]);

  const handleCardClick = (admin) => {
    setUsers([]);
    setSelectedAdmin(admin);
  };

  const handlePopupOpen = (type, user = null) => {
    setPopupType(type);
    setPopupVisible(true);

    if (type === "edit" && user) {
      setCurrentUser(user);
      setUserData({
        name: user.name,
        phoneNumber: user.phoneNumber,
        place: user.place,
        date: user.date.split("T")[0],
        amount: user.amount,
        month: user.month,
      });
    } else if (type === "add") {
      setUserData({
        name: "",
        phoneNumber: "",
        place: "",
        date: "",
        amount: "",
        month: "",
      });
      setCurrentUser(null);
    }
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setDeletePopupVisible(false); 
    setUserData({
      name: "",
      phoneNumber: "",
      place: "",
      date: "",
      amount: "",
      month: "",
    });
    setCurrentUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        popupType === "add"
          ? "http://localhost:3001/api/users"
          : `http://localhost:3001/api/users/${selectedAdmin}/${currentUser._id}`;
      const method = popupType === "add" ? "POST" : "PUT";

      const body = JSON.stringify({
        ...userData,
        admin: selectedAdmin,
      });

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (response.ok) {
        fetchUsers(selectedAdmin);
        handlePopupClose();
      } else {
        console.error("Error saving user:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  
    const handleDeletePopupOpen = (user) => {
      setUserToDelete(user);
      setDeletePopupVisible(true);
    };

    const handleDelete = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${selectedAdmin}/${userToDelete._id}`,
          {
            method: "DELETE",
          }
        );
    
        if (response.ok) {
          fetchUsers(selectedAdmin); // Refetch users after deleting
          handlePopupClose();
        } else {
          console.error("Error deleting user:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

  return (
    <div className="home-container">
      <div className="home-container__card-container">
        {admins.map((admin) => (
          <Card key={admin} name={admin} onClick={() => handleCardClick(admin)} />
        ))}
      </div>

      <div className="home-container__table-container">
        <div className="home-container__table-container__heading">
          <h2>{selectedAdmin ? `${selectedAdmin}` : "Select an Admin"}</h2>
          {selectedAdmin && (
            <button onClick={() => handlePopupOpen("add")}>Add User</button>
          )}
        </div>

        {selectedAdmin && (
          <table className="home-container__table-container__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Place</th>
                {months.map((month) => (
                  <th key={month}>{month}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.place}</td>
                  {months.map((month) => (
                    <td key={month}>
                      {user.month === month ? user.amount : "-"}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handlePopupOpen("edit", user)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeletePopupOpen(user)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isPopupVisible && (
        <div className="home-container-popup">
          <div className="home-container-popup__content add-edit-popup">
            <form onSubmit={handleSubmit}>
              <h3>{popupType === "add" ? "Add New User" : "Edit User"}</h3>

              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Phone Number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Place</label>
                <input
                  type="text"
                  name="place"
                  value={userData.place}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Month</label>
                <select
                  name="month"
                  value={userData.month}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={userData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={userData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form__actions">
                <button type="submit">
                  {popupType === "add" ? "Save" : "Update"}
                </button>
                <button type="button" onClick={handlePopupClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeletePopupVisible && (
          <div className="home-container-popup">
            <div className="home-container-popup__content delete-popup">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this client?</p>
              <div className="form__actions">
                <button type="submit" onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button type="button" onClick={handlePopupClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default HomePage;

