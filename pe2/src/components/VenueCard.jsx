import React, { useState } from 'react';
import Modal from 'react-modal';

const VenueCard = ({ venue }) => {
  const { id, name, description, price, media, location } = venue;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="venue-card">
      <img src={media[0]?.url} alt={media[0]?.alt || name} className="venue-image" />
      <div className="venue-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Location:</strong> {location.city}, {location.country}</p>
        <button className="view-more-btn" onClick={openModal}>View More</button>
      </div>

      {}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Venue Details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Location:</strong> {location.city}, {location.country}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default VenueCard;
