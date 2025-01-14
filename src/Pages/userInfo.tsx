import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, clearUsers  } from "../store/userSlice";
import { RootState, AppDispatch } from "../store/store";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);

  return (
    <div>
      <h3>Data Card</h3>
      <button onClick={() => dispatch(clearUsers())}>
                Clear All Users
              </button>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={user.id}>
              <p>
                <strong>{index + 1}.</strong> <br />
                <strong>Name:</strong> {user.userName} <br />
                <strong>Address:</strong> {user.address} <br />
                <strong>Email:</strong> {user.email} <br />
                {user.cardDetails && (
                  <>
                    <strong>Card Information:</strong> <br />
                    <strong>Card Number:</strong> {user.cardDetails.cardNumber}{" "}
                    <br />
                    <strong>Secret:</strong> {user.cardDetails.secret} <br />
                    <strong>Expiration Date:</strong>{" "}
                    {user.cardDetails.expirationDate}
                  </>
                )}
              </p>
              <button onClick={() => dispatch(removeUser(user.id))}>
                Remove
              </button>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No users added yet.</p>
      )}
    </div>
  );
};

export default UserList;
