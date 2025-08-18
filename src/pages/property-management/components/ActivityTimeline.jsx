import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ActivityTimeline = ({ activities = [], client }) => {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'note',
    title: '',
    description: ''
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'showing':
        return 'Calendar';
      case 'call':
        return 'Phone';
      case 'email':
        return 'Mail';
      case 'meeting':
        return 'Users';
      case 'note':
        return 'FileText';
      case 'offer':
        return 'DollarSign';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'showing':
        return 'bg-blue-100 text-blue-600';
      case 'call':
        return 'bg-green-100 text-green-600';
      case 'email':
        return 'bg-purple-100 text-purple-600';
      case 'meeting':
        return 'bg-orange-100 text-orange-600';
      case 'note':
        return 'bg-gray-100 text-gray-600';
      case 'offer':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleAddActivity = (e) => {
    e?.preventDefault();
    if (newActivity?.title?.trim()) {
      console.log('Adding activity:', newActivity);
      setNewActivity({ type: 'note', title: '', description: '' });
      setShowAddActivity(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Activity Timeline</h3>
          <button
            onClick={() => setShowAddActivity(!showAddActivity)}
            className="text-sm text-primary hover:text-primary-600 flex items-center space-x-1"
          >
            <Icon name="Plus" size={16} />
            <span>Add Activity</span>
          </button>
        </div>
        
        {client && (
          <div className="mt-3 p-3 bg-primary-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Primary Client: {client?.name}
              </span>
            </div>
            <div className="text-xs text-primary-600 mt-1">
              {client?.email} • {client?.phone} • {client?.type}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        {/* Add Activity Form */}
        {showAddActivity && (
          <form onSubmit={handleAddActivity} className="mb-6 p-4 border border-border rounded-lg bg-surface-hover">
            <div className="space-y-3">
              <div>
                <select
                  value={newActivity?.type}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, type: e?.target?.value }))}
                  className="input-field text-sm"
                >
                  <option value="note">Note</option>
                  <option value="showing">Property Showing</option>
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="offer">Offer</option>
                </select>
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Activity title"
                  value={newActivity?.title}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, title: e?.target?.value }))}
                  className="input-field text-sm"
                  required
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Activity description"
                  value={newActivity?.description}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, description: e?.target?.value }))}
                  rows={2}
                  className="input-field text-sm resize-none"
                />
              </div>
            </div>
            
            <div className="flex space-x-2 mt-3">
              <button
                type="submit"
                className="btn-primary text-sm px-3 py-1"
              >
                Add Activity
              </button>
              <button
                type="button"
                onClick={() => setShowAddActivity(false)}
                className="text-sm px-3 py-1 text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Activity List */}
        <div className="space-y-4">
          {activities?.length > 0 ? (
            activities?.map((activity) => (
              <div key={activity?.id} className="flex space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={14} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-primary">
                      {activity?.title}
                    </p>
                    <span className="text-xs text-text-tertiary">
                      {formatDate(activity?.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mt-1">
                    {activity?.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-text-tertiary">
                      by {activity?.user}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="Activity" size={32} className="text-text-tertiary mx-auto mb-2" />
              <p className="text-text-secondary text-sm">No activities recorded yet</p>
              <p className="text-text-tertiary text-xs">Property interactions and communications will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;