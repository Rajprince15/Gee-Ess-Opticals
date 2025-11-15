import React, { useState } from 'react';
import Button from '../ui/Button';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault, isDefault = false, showActions = true }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete && onDelete(address.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative ${
        isDefault ? 'ring-2 ring-primary-600' : ''
      }`}
      data-testid={`address-card-${address.id}`}
    >
      {/* Default Badge */}
      {isDefault && (
        <div className="absolute top-4 right-4">
          <span className="badge-success" data-testid="default-badge">Default</span>
        </div>
      )}

      {/* Address Type */}
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {address.address_type === 'home' ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          )}
        </svg>
        <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize" data-testid="address-type">
          {address.address_type || 'Home'}
        </span>
      </div>

      {/* Full Name */}
      <p className="text-base font-medium text-gray-900 dark:text-white mb-2" data-testid="address-name">
        {address.full_name}
      </p>

      {/* Address Lines */}
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
        <p data-testid="address-line1">{address.address_line1}</p>
        {address.address_line2 && <p data-testid="address-line2">{address.address_line2}</p>}
        <p data-testid="address-city-state">
          {address.city}, {address.state} {address.postal_code}
        </p>
        <p data-testid="address-country">{address.country}</p>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span data-testid="address-phone">{address.phone_number}</span>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          {!isDefault && onSetDefault && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSetDefault(address.id)}
              className="flex-1"
              data-testid="set-default-button"
            >
              Set as Default
            </Button>
          )}
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(address)}
              className="flex-1"
              data-testid="edit-address-button"
            >
              Edit
            </Button>
          )}
          {onDelete && !isDefault && (
            <>
              {!showDeleteConfirm ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex-1"
                  data-testid="delete-address-button"
                >
                  Delete
                </Button>
              ) : (
                <div className="flex gap-2 flex-1">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDelete}
                    className="flex-1"
                    data-testid="confirm-delete-button"
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1"
                    data-testid="cancel-delete-button"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressCard;
