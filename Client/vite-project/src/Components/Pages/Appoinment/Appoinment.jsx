import React, { useState } from 'react';
import './Appoinment.css';
import Modal from '../Modal/Modal'; // Assuming you have a Modal component

const Appointment = ({ users }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('appointment'); // Track the active tab

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // Handle switching between tabs
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container">
      {/* Tabs Section */}
      <div className="tabs">
        <button
          className={activeTab === 'appointment' ? 'active' : ''}
          onClick={() => handleTabChange('appointment')}
        >
          Appointment
        </button>
        <button
          className={activeTab === 'e-opd' ? '' : ''}
          onClick={() => handleTabChange('e-opd')}
        >
          e-OPD Card
        </button>
        <button
          className={activeTab === 'reports' ? '' : ''}
          onClick={() => handleTabChange('reports')}
        >
          Reports
        </button>
      </div>

      {/* Content Section */}
      <div className="content">
        {activeTab === 'appointment' && (
          <>
            {users && users.length > 0 ? (
              <div className="user-list">
                {users.map((user, index) => (
                  <div className="user-card" key={index}>
                    <p className="user-name">
                      {user.initial} {user.firstName} {user.middleName} {user.lastName}, {user.gender}
                    </p>
                    <div className="user-details">
                      <p><strong>Name:</strong> {user.initial} {user.firstName} {user.middleName} {user.lastName}</p>
                      <p><strong>Year of Birth:</strong> {user.year}</p>
                      <p><strong>Gender:</strong> {user.gender}</p>
                      <p><strong>Address:</strong> {user.address}</p>
                      <p><strong>State:</strong> {user.state}</p>
                      <p><strong>Mobile:</strong> {user.mobileNo}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-appointments">
                <p>No appointments found</p>
              </div>
            )}

            {/* Appointment Button */}
            <div className="appointment-button">
              <button className="add-appointment-btn" onClick={openModal}>+ Appointment</button>
            </div>

            {/* Modal visible only when the appointment tab is active */}
            {isModalVisible && <Modal isVisible={isModalVisible} onClose={closeModal} users={users} />}
          </>
        )}

        {activeTab === 'e-opd' && (
          <div className="e-opd-content">
            {/* Content for e-OPD Card tab */}
            <p>e-OPD Card content goes here.</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-content">
            {/* Content for Reports tab */}
            <p>Reports content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;