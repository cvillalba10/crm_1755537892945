import React from 'react';
import Icon from 'components/AppIcon';

const PropertyActions = ({ onSave, onDelete, onClone, onScheduleShowing, isSaving }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onSave}
        disabled={isSaving}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        {isSaving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Icon name="Save" size={16} />
            <span>Save</span>
          </>
        )}
      </button>

      <button
        onClick={onScheduleShowing}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success-600 transition-colors duration-150"
      >
        <Icon name="Calendar" size={16} />
        <span>Schedule Showing</span>
      </button>

      <button
        onClick={onClone}
        className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-150"
      >
        <Icon name="Copy" size={16} />
        <span>Clone</span>
      </button>

      <button
        onClick={onDelete}
        className="inline-flex items-center space-x-2 px-4 py-2 border border-error text-error rounded-lg hover:bg-error hover:text-white transition-colors duration-150"
      >
        <Icon name="Trash2" size={16} />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default PropertyActions;