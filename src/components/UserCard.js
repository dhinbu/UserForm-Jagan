import React, { useState } from "react";

const UserCard = ({ data, onEditClick }) => {
  const [userData, setUserData] = useState(data);
  const [editCard, setEditCard] = useState([]);

  const editClick = (index) => {
    setEditCard(data[index]);
    onEditClick({ ...data[index], index: index });
  };

  const deleteClick = (ind) => {
    const updatedUserData = data.filter((del, index) => index !== ind);
    alert("Deleted Successfully, Please relod the page")
    console.log(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData))
    // setUserData(updatedUserData);
  };

  return (
    <div className="grid w-max h-min mb-8 border border-gray-200 rounded-lg shadow-sm md:mb-12 md:grid-cols-3 bg-white dark:border-gray-700">
      {data?.map((card, index) => (
        <div key={index} className="flex flex-wrap border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.firstName} {card.lastName}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Email: {card.email}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Phone: {card.dial.name} {card.phoneNumber}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Address: {card.address1}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Country: {card.country.name}
              </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  State: {card.state.name}
                </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Zip: {card.zip}
              </p>
            </div>
          </div>
          <div className="flex">
            <a
              onClick={() => editClick(index)}
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </a>
            <a
              onClick={() => deleteClick(index)}
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
            >
              Delete
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
